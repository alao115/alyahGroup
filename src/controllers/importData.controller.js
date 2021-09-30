import { success } from 'consola'

export default ({ PubSub }) => class Import {

  static purgeData(collections) {
    const localCollections = collections
    localCollections.forEach( collection => {
      const { name, data } = collection

      data.forEach( (entity, ind) => {
        const entityKeys = Object.keys(entity)

        entityKeys.forEach((key, index) => {
          const isKeyId = key.match(/Id$/)

          if(isKeyId && entity[key]) {
            const keyCollection = key.replace(/Id$/, '')
            localCollections.forEach( collection_1 =>  {
              if( collection_1.name === (keyCollection + 's') ) {
                const isKeyMatchExist = collection_1.data.find(entity_1 => entity_1[keyCollection + 'ID'] === entity[key])
                if(!isKeyMatchExist) {
                  delete data[ind]
                }
              }
            })
          }

          if(entity[key] === '') entity[key] = null
        })
      })

      collection.data = collection.data.filter( col => col !== undefined && col )

    })
    return localCollections
  }

  static async newDatabase (req, res, next) {
    try {
      const {file} = req;
      const {authUser} = req.payload;
      const data = JSON.parse(file.buffer.toString());

      const services = await import('../services');

      let collections = [];
      const collectionOrder = [
        'users',
        'curriculums',
        'proms',
        'academicYears',
        'enterprises',
        'grades',
        'internshipTypes',
        'accounts',
        'events',
        'offers',
        'folders',
        'addresses',
        'documents',
        'experiences',
        'billings',
        'absences',
        /* 'events', */
        'personalInfos',
        'scolarships',
        'teachingUnits',
        'subjects',
        'retakeExams',
        'lists',
        'exams',
        'marks'
      ]

      collectionOrder.forEach(key => {
        const collectionDataTemp = data[key];
        const collectonData = [];

        Object.keys(collectionDataTemp).forEach(key_1 => {
          delete collectionDataTemp[key_1].createdAt;
          delete collectionDataTemp[key_1].createdBy;
          delete collectionDataTemp[key_1].modifiedAt;
          delete collectionDataTemp[key_1].modifiedBy;
          collectonData.push({
            [key.replace(/s$/g, '') + 'ID']: key_1,
            relatedField: key.replace(/s$/g, '') + 'Id',
            ...collectionDataTemp[key_1],
            createdBy: authUser._id,
          });
        });

        collections.push({
          name: key,
          data: collectonData,
          serviceName: key.replace(/s$/g, '') + 'Service',
          relationalField: key.replace(/s$/g, '') + 'ID',
        });
      });

      collections = Import.purgeData(collections)

      for (let k = 0; k < collections.length; ++k) {
        const {name: collectionName, data: collectionData, serviceName, relationalField} = collections[k];

        if (services[serviceName] && serviceName !== 'curriculum') {
          for (let i = 0; i < collectionData.length; ++i) {
            const doc = collectionData[i];
            // console.log(doc)
            const savedDoc = await services[serviceName].create(doc);

            for (let l = 0; l < collections.length; ++l) {
              const col = collections[l];
              if (col.name !== collectionName) {
                for (let j = 0; j < col.data.length; ++j) {
                  const diffDoc = col.data[j];
                  if (doc.relatedField === 'accountId') {
                    const studentField = diffDoc['studentId'] ? 'studentId' : 'accountId'

                    if( diffDoc[studentField] && diffDoc[studentField] === doc[relationalField])
                      diffDoc[studentField] = savedDoc._id;
                  }

                  if (diffDoc[doc.relatedField] && diffDoc[doc.relatedField] === doc[relationalField]) {
                    diffDoc[doc.relatedField] = savedDoc._id;
                  }
                }
              }
            }
          }
          success(`Importing '${collectionName}' collection: Done`)
        }
      }

      PubSub.publish(
        'CREATE_ACTIVITY',
        JSON.stringify({
          description: 'Importing data from file',
          title: 'Importing',
          elementType: 'file',
          createdBy: authUser._id,
        })
      );
      res.send({success: 1, data: {collections}});
    } catch (error) {
      console.log('Essaie d affichage d erreur');
      console.log(error);
      next(error);
    }
  }

  static async oldDatabase (req, res, next) {
    try {
      const {file} = req;
      const {authUser} = req.payload;
      const data = JSON.parse(file.buffer.toString());

      const services = await import('../services');

      const users = {}
      let collections = [];
      const collectionOrder = [
        'users',
        'curriculums',
        'accounts',
        'students',
        'folders',
        'personalInfos',
        'addresses',
        'scolarships',
        'experiences',
        'documents',
        /* 'academicYears',
        'proms',
        'enterprises',
        'grades',
        'internshipTypes', */
        /* 'events',
        'offers',
        'billings',
        'absences',
        'events',
        'teachingUnits',
        'subjects',
        'retakeExams',
        'lists',
        'exams',
        'marks' */
      ]

      /* Reformat user data */
      data['users'].forEach(user => {
        users[user.uid] = { ...user }
      })
      data['users'] = users
      /* End user refactoring */

      collectionOrder.forEach(key => {
        const collectionDataTemp = data[key];
        const collectonData = [];

        Object.keys(collectionDataTemp).forEach(key_1 => {
          delete collectionDataTemp[key_1].createdAt;
          delete collectionDataTemp[key_1].createdBy;
          delete collectionDataTemp[key_1].modifiedAt;
          delete collectionDataTemp[key_1].modifiedBy;
          collectonData.push({
            [key.replace(/s$/g, '') + 'ID']: key_1,
            relatedField: key.replace(/s$/g, '') + 'Id',
            ...collectionDataTemp[key_1],
            createdBy: authUser._id,
          });
        });

        collections.push({
          name: key,
          data: collectonData,
          serviceName: key.replace(/s$/g, '') + 'Service',
          relationalField: key.replace(/s$/g, '') + 'ID',
        });
      });

      let students = []

      collections.forEach( (collection, index) => {
        if (collection.name === 'students') {
          students = collection.data
          delete collections[index]
        }
      })

      collections = collections.filter( collection => collection !== undefined && collection )

      collections.forEach( collection => {
        if (collection.name === 'accounts') {

          const accounts = collection.data

          accounts.forEach( (account, index) => {
            const student = students.find( student => student.accountId === account.accountID)

            if(student) {
              accounts[index] = {
                                  ...account,
                                  studentStatus: student.status,
                                  curriculumId: student.curriculumId,
                                  urlPhoto: student.urlPhoto
                                }
            }
          })

          collection.data = accounts

        }
      })

      collections = Import.purgeData(collections)

      for (let k = 0; k < collections.length; ++k) {
        const {name: collectionName, data: collectionData, serviceName, relationalField} = collections[k];

        if (services[serviceName]) {
          for (let i = 0; i < collectionData.length; ++i) {
            const doc = collectionData[i];
            // console.log(doc)
            const savedDoc = await services[serviceName].create(doc);

            for (let l = 0; l < collections.length; ++l) {
              const col = collections[l];
              if (col.name !== collectionName) {
                for (let j = 0; j < col.data.length; ++j) {
                  const diffDoc = col.data[j];
                  if (doc.relatedField === 'accountId') {
                    const studentField = diffDoc['studentId'] ? 'studentId' : 'accountId'

                    if( diffDoc[studentField] && diffDoc[studentField] === doc[relationalField])
                      diffDoc[studentField] = savedDoc._id;
                  }

                  if (diffDoc[doc.relatedField] && diffDoc[doc.relatedField] === doc[relationalField]) {
                    diffDoc[doc.relatedField] = savedDoc._id;
                  }
                }
              }
            }
          }
          success(`Importing '${collectionName}' collection: Done`)
        }
      }

      PubSub.publish(
        'CREATE_ACTIVITY',
        JSON.stringify({
          description: 'Importing data from file',
          title: 'Importing',
          elementType: 'file',
          createdBy: authUser._id,
        })
      );
      res.send({success: 1, data: { collections }});
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
};

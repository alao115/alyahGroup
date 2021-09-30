/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import Joi from 'joi';
import createError from 'http-errors';

export default class ValidationManager {
  static schemas() {
    return {
      signup: Joi.object({
        accountType: Joi.string().valid('admin', 'student', 'teacher', 'applicant'),
        adminType: Joi.string().valid('schooling', 'onboarding'),
        curriculumId: Joi.string().allow(''),
        email: Joi.string().email().required(),
        firstname: Joi.string().min(3).required(),
        name: Joi.string().min(3).required(),
        password: Joi.string().min(8).default('12345678'),
        promId: Joi.string().allow(''),
        subjects: Joi.array().items(Joi.string()).allow('[]', ''),
        phone: Joi.string().allow(''),
        matricule: Joi.string().allow(''),
      }),

      signin: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),

      refreshToken: Joi.object({
        'refresh-token': Joi.string().required(),
      }),

      passwordRecoveryToken: Joi.object({
        'password-recovery-token': Joi.string().required(),
      }),

      emailVerification: Joi.object({
        'email-token': Joi.string().required(),
      }),

      resetPassword: Joi.object({
        email: Joi.string().email().required(),
      }),

      absence: Joi.object({
        absenceDate: Joi.string().allow(''),
        arrivedTime: Joi.string().allow(''),
        count: Joi.number().allow(0, ''),
        reason: Joi.string().allow(''),
        semester: Joi.string().required(),
        studentId: Joi.string().required(),
        subjectId: Joi.string().allow(null, ''),
        eventId: Joi.string().allow(''),
        type: Joi.string().required()
      }),

      academicyear: Joi.object({
        endDate: Joi.string().required(),
        firstSemesterEnd: Joi.string().required(),
        firstSemesterStart: Joi.string().required(),
        label: Joi.string().required(),
        secondSemesterEnd: Joi.string().required(),
        secondSemesterStart: Joi.string().required(),
        startDate: Joi.string().required(),
      }),

      curriculum: Joi.object({
        code: Joi.string().required(),
        color: Joi.object({
          backgroundColor: Joi.string().required(),
          borderColor: Joi.string().required(),
          tagBackgroundColor: Joi.string().required(),
          value: Joi.string().required(),
        }).required(),
        fullScolarship: Joi.number().required(),
        halfScolarship: Joi.number().required(),
        illustration: Joi.array().items(
          Joi.object({
            id: Joi.number(),
            value: Joi.string().required(),
          })
        ).allow('[]'),
        label: Joi.string().required(),
        tuition: Joi.number().required(),
      }),

      prom: Joi.object({
        curriculumId: Joi.string().required(),
        description: Joi.string().required(),
        endYear: Joi.string().required(),
        label: Joi.string().required(),
        startYear: Joi.string().required()
      }),

      enterprise: Joi.object({
        academicYearId: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        isPartner: Joi.boolean().default(false),
        name: Joi.string().required(),
        phone: Joi.string().required(),
      }),

      event: Joi.object({
        accountId: Joi.string().allow(''),
        colorEvent: Joi.object({
          backgroundColor: Joi.string().allow(''),
          borderColor: Joi.string().allow(''),
          textColor: Joi.string().allow(''),
          value: Joi.string().allow(''),
        }).allow(null, {}, ''),
        curriculumId: Joi.string().required(),
        daysOfWeek: Joi.array().items(
          Joi.string().allow('')
        ).allow(''),
        description: Joi.string().allow(''),
        end: Joi.string().allow(''),
        endRecur: Joi.string().allow(''),
        endTime: Joi.string().allow(''),
        photoEvent: Joi.string().allow(''),
        promId: Joi.string().required(),
        label: Joi.string().allow(''),
        start: Joi.string().allow(''),
        startRecur: Joi.string().allow(''),
        startTime: Joi.string().allow(''),
        subject: Joi.string().allow(''),
        teacher: Joi.string().allow(null),
        title: Joi.string().required(),
        typeEvent: Joi.string().required(),
      }),

      grade: Joi.object({
        code: Joi.string().required(),
        color: Joi.object({
          backgroundColor: Joi.string().required(),
          borderColor: Joi.string().required(),
          tagBackgroundColor: Joi.string().required().allow(''),
          value: Joi.string().required(),
        }),
        description: Joi.string().allow(''),
        label: Joi.string().required(),
        maxRange: Joi.string().required(),
        minRange: Joi.string().required()
      }),

      internshipType: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        duration: Joi.string().required(),
        label: Joi.string().required(),
        curriculumId: Joi.string().required(),
        promId: Joi.string().required(),
      }),

      internship: Joi.object({
        endDate: Joi.string().allow(''),
        enterpriseId: Joi.string().required(),
        internshipTypeId: Joi.string().required(),
        startDate: Joi.string().allow(''),
        status: Joi.boolean().allow(''),
        studentId: Joi.string().required(),
      }),

      offer: Joi.object({
        description: Joi.string().required(),
        duration: Joi.string().required(),
        enterpriseId: Joi.string().required(),
        internshipTypeId: Joi.string().required(),
        isArchived: Joi.string().required().valid('Not archived', 'archived'),
        status: Joi.string().required(),
        title: Joi.string().required(),
      }),

      folder: Joi.object({
        accountId: Joi.string().required(),
        curriculumId: Joi.string().required(),
        isArchived: Joi.string().valid('Not archived', 'archived'),
        status: Joi.string().allow(''),
      }),

      personalInfo: Joi.object({
        birthDate: Joi.string().allow(''),
        birthPlace: Joi.string().allow(''),
        bordereauNumber: Joi.number().allow('0'),
        bordereauUrl: Joi.string().allow(''),
        fatherProf: Joi.string().allow(''),
        folderId: Joi.string().required(),
        motherProf: Joi.string().allow(''),
        nationality: Joi.string().allow(''),
        siblings: Joi.string().allow('')
      }),

      address: Joi.object({
        city: Joi.string().allow(''),
        country: Joi.string().allow(''),
        email: Joi.string().email().required(),
        familyAddress: Joi.string().allow(''),
        folderId: Joi.string().required(),
        phone: Joi.string().allow(''),
        postalCode: Joi.string().allow('')
      }),

      billing: Joi.object({
        studentId: Joi.string().required()
      }),

      tuition: Joi.object({
        accountId: Joi.string().required()
      }),

      payment: Joi.object({
        amount: Joi.number().required(),
        paymentType: Joi.string().required(),
        restToPay: Joi.number().required(),
        tuitionId: Joi.string().required()
      }),

      document: Joi.object({
        bacGradebookUrl: Joi.string().allow(''),
        bordereauNumber: Joi.number().allow('0'),
        bordereauUrl: Joi.string().allow(''),
        folderId: Joi.string().required(),
        idPhotoUrl: Joi.string().allow(''),
        preSeniorYearGradebookUrl: Joi.string().allow(''),
        SeniorYearGradebookUrl: Joi.string().allow(''),
        universityGradebookUrl: Joi.string().allow(''),
      }),

      experience: Joi.object({
        art: Joi.string().allow(''),
        experiences: Joi.array().items(Joi.object({
          enterprise: Joi.string().allow(''),
          job: Joi.string().allow(''),
          jobEnd: Joi.string().allow(''),
          jobStart: Joi.string().allow(''),
        })).allow('[]', ''),
        folderId: Joi.string().required(),
        knowAds: Joi.string().allow(''),
        logiciels: Joi.array().items(Joi.object({
          logi2d: Joi.string().allow(''),
          logiLvl: Joi.string().allow('')
        })).allow('[]', ''),
        sports: Joi.string().allow(''),
      }),

      scolarship: Joi.object({
        currentSituation: Joi.string().allow(''),
        englishLevel: Joi.string().allow(''),
        folderId: Joi.string().required(),
        formations: Joi.array().items(Joi.object({
          degree: Joi.string().allow(''),
          degreeYear: Joi.string().allow(''),
          school: Joi.string().allow('')
        })).allow('[]', '')
      }),

      subject: Joi.object({
        academicYearId: Joi.string().required(),
        code: Joi.string().allow(''),
        coef: Joi.number().required(),
        color: Joi.object({
          backgroundColor: Joi.string().allow(''),
          borderColor: Joi.string().allow(''),
          tagBackgroundColor: Joi.string().allow(''),
          value: Joi.string().required(),
        }).required(),
        curriculumId: Joi.string().required(),
        label: Joi.string().required(),
        promId: Joi.string().required(),
        selectedIcons: Joi.array().items(
          Joi.object({
            id: Joi.number().allow(''),
            value: Joi.string().allow(''),
          })
        ).allow('[]'),
        semester: Joi.string().required(),
        status: Joi.string().allow(''),
        teachingUnitId: Joi.string().allow('')
      }),

      teachingUnit: Joi.object({
        academicYearId: Joi.string().required(),
        code: Joi.string().allow(''),
        credits: Joi.number().required(),
        curriculumId: Joi.string().required(),
        label: Joi.string().required(),
        promId: Joi.string().required(),
        semester: Joi.string().required(),
        status: Joi.string().allow('')
      }),

      exam: Joi.object({
        code: Joi.string().required(),
        coef: Joi.number().required(),
        curriculumId: Joi.string().required(),
        description: Joi.string().allow(''),
        examDate: Joi.string().required(),
        label: Joi.string().required(),
        listId: Joi.string().allow(''),
        promId: Joi.string().required(),
        status: Joi.string().required(),
        subjectId: Joi.string().required(),
      }),

      mark: Joi.object({
        coef: Joi.number().required(),
        curriculumId: Joi.string().required(),
        examId: Joi.string().required(),
        listId: Joi.string().allow(''),
        mark: Joi.number().required(),
        reason: Joi.string().allow(''),
        semester: Joi.string().allow(''),
        subjectId: Joi.string().required(),
        studentId: Joi.string().required(),
      }),

      retakeExam: Joi.object({
        coef: Joi.number().allow(''),
        curriculumId: Joi.string().required(),
        dateRetake: Joi.string().required(),
        description: Joi.string().allow(''),
        mark: Joi.number().allow(''),
        promId: Joi.string().required(),
        status: Joi.string().allow(''),
        subjectId: Joi.string().required(),
      }),

      user: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),

      fileUpload: Joi.object({
        filePath: Joi.string().required(),
        file: Joi.binary().required(),
      }),

      importFile: Joi.object({
        file: Joi.binary().required(),
      }),

      fileDownloadDeletion: Joi.object({
        filePath: Joi.string().required(),
      }),

      convocation: Joi.object({
        code: Joi.string().required(),
        consigne: Joi.string().required(),
        dateConvoc: Joi.string(),
        timeConvoc: Joi.string().required()
      }),

      /* createQuote: Joi.object({
        client: Joi.string().required(),
        dateLimite: Joi.string().required(),
        discount: Joi.number().allow(0),
        items: Joi.array().items(Joi.object({ item: Joi.string().required(), quantity: Joi.number().required() })).required(),
        ref: Joi.string().required(),
        status: Joi.string().required(),
        tax: Joi.string().required(),
      }), */

      mail: Joi.object({
        from: Joi.string().email().required(),
        to: Joi.array().required(),
        subject: Joi.string().required(),
        content: Joi.string().required(),
        attachments: Joi.array(),
        file: Joi.array()
      }),

      mailVerification: Joi.object({
        email: Joi.string().email().required(),/*
        firstname: Joi.string().required(),
        name: Joi.string().required(), */
      }),
    };
  }

  static validationHelper(schema) {
    return async (req, res, next) => {
      try {
        let result = null;
        if (req.file) {
          result = await schema.validateAsync({ ...req.body, file: req.file.buffer }, { abortEarly: false });
        } else result = await schema.validateAsync(req.body, { abortEarly: false });
        if (!req.payload) req.payload = {};
        req.payload.validatedData = result;
        next();
      } catch (err) {
        next(createError.BadRequest(err.message));
      }
    };
  }
}

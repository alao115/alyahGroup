(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{255:function(e,t,l){var content=l(256);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(42).default)("cff50560",content,!0,{sourceMap:!1})},256:function(e,t,l){var r=l(41)((function(i){return i[1]}));r.push([e.i,"@-webkit-keyframes splide-loading{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes splide-loading{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.splide__container{position:relative;box-sizing:border-box}.splide__list{margin:0!important;padding:0!important;width:-webkit-max-content;width:-moz-max-content;width:max-content;will-change:transform}.splide.is-active .splide__list{display:flex}.splide__pagination{display:inline-flex;align-items:center;width:95%;flex-wrap:wrap;justify-content:center;margin:0}.splide__pagination li{list-style-type:none;display:inline-block;line-height:1;margin:0}.splide{visibility:hidden}.splide,.splide__slide{position:relative;outline:none}.splide__slide{box-sizing:border-box;list-style-type:none!important;margin:0;flex-shrink:0}.splide__slide img{vertical-align:bottom}.splide__slider{position:relative}.splide__spinner{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;display:inline-block;width:20px;height:20px;border-radius:50%;border:2px solid #999;border-left-color:transparent;-webkit-animation:splide-loading 1s linear infinite;animation:splide-loading 1s linear infinite}.splide__track{position:relative;z-index:0;overflow:hidden}.splide--draggable>.splide__track>.splide__list>.splide__slide{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.splide--fade>.splide__track>.splide__list{display:block}.splide--fade>.splide__track>.splide__list>.splide__slide{position:absolute;top:0;left:0;z-index:0;opacity:0}.splide--fade>.splide__track>.splide__list>.splide__slide.is-active{position:relative;z-index:1;opacity:1}.splide--rtl{direction:rtl}.splide--ttb>.splide__track>.splide__list{display:block}.splide--ttb>.splide__pagination{width:auto}.splide__arrow{position:absolute;z-index:1;top:50%;transform:translateY(-50%);width:2em;height:2em;border-radius:50%;display:flex;align-items:center;justify-content:center;border:none;padding:0;opacity:.7;background:#ccc}.splide__arrow svg{width:1.2em;height:1.2em}.splide__arrow:hover{cursor:pointer;opacity:.9}.splide__arrow:focus{outline:none}.splide__arrow--prev{left:1em}.splide__arrow--prev svg{transform:scaleX(-1)}.splide__arrow--next{right:1em}.splide__pagination{position:absolute;z-index:1;bottom:.5em;left:50%;transform:translateX(-50%);padding:0}.splide__pagination__page{display:inline-block;width:8px;height:8px;background:#ccc;border-radius:50%;margin:3px;padding:0;transition:transform .2s linear;border:none;opacity:.7}.splide__pagination__page.is-active{transform:scale(1.4);background:#fff}.splide__pagination__page:hover{cursor:pointer;opacity:.9}.splide__pagination__page:focus{outline:none}.splide__progress__bar{width:0;height:3px;background:#ccc}.splide--nav>.splide__track>.splide__list>.splide__slide{border:3px solid transparent}.splide--nav>.splide__track>.splide__list>.splide__slide.is-active{border-color:#000}.splide--nav>.splide__track>.splide__list>.splide__slide:focus{outline:none}.splide--rtl>.splide__arrows .splide__arrow--prev,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--prev{right:1em;left:auto}.splide--rtl>.splide__arrows .splide__arrow--prev svg,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--prev svg{transform:scaleX(1)}.splide--rtl>.splide__arrows .splide__arrow--next,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--next{left:1em;right:auto}.splide--rtl>.splide__arrows .splide__arrow--next svg,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--next svg{transform:scaleX(-1)}.splide--ttb>.splide__arrows .splide__arrow,.splide--ttb>.splide__track>.splide__arrows .splide__arrow{left:50%;transform:translate(-50%)}.splide--ttb>.splide__arrows .splide__arrow--prev,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--prev{top:1em}.splide--ttb>.splide__arrows .splide__arrow--prev svg,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--prev svg{transform:rotate(-90deg)}.splide--ttb>.splide__arrows .splide__arrow--next,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--next{top:auto;bottom:1em}.splide--ttb>.splide__arrows .splide__arrow--next svg,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--next svg{transform:rotate(90deg)}.splide--ttb>.splide__pagination{display:flex;flex-direction:column;bottom:50%;left:auto;right:.5em;transform:translateY(50%)}",""]),r.locals={},e.exports=r},264:function(e,t,l){"use strict";l.r(t);l(255);var r={components:{},data:function(){return{options:{autoplay:!0,rewind:!0,width:"100%",height:800,interval:5e3,perPage:1,gap:"1rem",direction:"ttb"}}},created:function(){}},o=l(9),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"relative overflow-x-hidden"},[l("section",{staticClass:"pb-10 lg:pb-36 px-4 md:px-8 lg:px-10 xl:px-36 bg-home-color rounded-3xl"},[l("div",{staticClass:"flex flex-col bg-center bg-cover bg-no-repeat rounded-3xl relative"},[l("splide",{staticClass:"rounded-3xl",attrs:{options:e.options}},[l("splide-slide",[l("img",{staticClass:"rounded-3xl h-full w-auto md:w-full object-cover",attrs:{src:"/images/image01.jpg"}})]),e._v(" "),l("splide-slide",[l("img",{staticClass:"rounded-3xl h-full w-auto md:w-full object-cover",attrs:{src:"/images/image02.jpg"}})]),e._v(" "),l("splide-slide",[l("img",{staticClass:"rounded-3xl h-full w-auto md:w-full object-cover",attrs:{src:"/images/image03.jpg"}})]),e._v(" "),l("splide-slide",[l("img",{staticClass:"rounded-3xl h-full w-auto md:w-full object-cover",attrs:{src:"/images/image05.jpg"}})])],1),e._v(" "),l("div",{staticClass:"absolute top-0 left-0 h-full bg-black w-full opacity-50 rounded-3xl"}),e._v(" "),e._m(0)],1)]),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),e._m(3)])}),[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"w-full lg:w-2/3 xl:w-2/3 flex flex-col justify-evenly items-center sm:px-12 sm:py-40 p-4 text-left sm:text-left absolute top-0 left-0 h-full rounded-3xl"},[l("h1",{staticClass:"text-4xl sm:text-7xl font-bold text-white mb-8"},[e._v("Nous sommes à votre service")]),e._v(" "),l("p",{staticClass:"text-lg leading-7 text-white mb-12 sm:pr-12"},[e._v(" Alyah-Group a pour objectif d’améliorer la qualité et le savoir-faire des entreprises qu’elle accompagne dans leurs développements.")]),e._v(" "),l("div",{staticClass:"bg-white flex justify-between p-2 w-full rounded-2xl"},[l("input",{staticClass:"pl-4 rounded-l-2xl w-2/3 sm:flex-1 bg-gray-200 border-none font-semibold mr-1 sm:-mr-4 focus:outline-none focus:ring-0",attrs:{id:"",type:"text",name:"",placeholder:"Votre email"}}),e._v(" "),l("button",{staticClass:"px-2 sm:p-3 rounded-md rounded-l-none bg-danger-color focus:outline-none focus:ring focus:ring-red-300 text-white font-semibold"},[e._v("Demander un devis")])])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"px-4 md:px-0 flex flex-col md:flex-row"},[l("div",{staticClass:"w-full md:w-1/2 bg-woman-eng bg-center bg-cover bg-no-repeat rounded-3xl rounded-l-none"}),e._v(" "),l("div",{staticClass:"w-full md:w-1/2 bg-white shadow border-gray-200 rounded-3xl md:rounded-r-none p-4 lg:px-20"},[l("h1",{staticClass:"font-bold text-4xl sm:text-5xl md:text-3xl lg:text-6xl text-left text-home-text-color-1"},[e._v("\n        Pourquoi"),l("span",{staticClass:"text-danger-color"},[e._v(" nous choisir?")])]),e._v(" "),l("div",{staticClass:"mt-12"},[l("h3",{staticClass:"font-bold text-4xl mb-4"},[e._v("Qualité 1")]),e._v(" "),l("span",{staticClass:"text-home-text-color-2 text-lg font-normal"},[e._v("L’excellence des produits et services pour satisfaire des clients de plus en plus exigeants et conquérir de nouveau marché.")])]),e._v(" "),l("div",{staticClass:"my-12"},[l("h3",{staticClass:"font-bold text-4xl mb-4"},[e._v("Qualité 2")]),e._v(" "),l("span",{staticClass:"text-home-text-color-2 text-lg font-normal"},[e._v("La performance des processus de fonctionnement et de l’organisation pour améliorer la productivité et plus largement piloter l’excellence opérationnelle des organisations (publique, privé).")])]),e._v(" "),l("div",[l("h3",{staticClass:"font-bold text-4xl mb-4"},[e._v("Qualité 3")]),e._v(" "),l("span",{staticClass:"text-home-text-color-2 text-lg font-normal"},[e._v("Pratiques managériales et des modes de coopération pour la satisfaction de toutes les parties prenantes, notamment les collaborateurs.")])])])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:"my-10 md:my-24 md:mb-8"},[l("h1",{staticClass:" font-bold text-5xl md:text-8xl text-center text-home-text-color-1"},[e._v("\n      Notre "),l("span",{staticClass:"text-danger-color"},[e._v("Equipe")])])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",{staticClass:" md:mt-0 px-4 lg:px-10 xl:px-36 md:py-24 md:pt-8 md:h-52R bg-ourTeam bg-no-repeat bg-cover flex flex-col justify-end relative"},[l("div",{staticClass:"md:p-8 w-full md:space-x-16 space-y-8 flex-1 flex md:flex-row flex-col md:justify-center justify-center items-center"},[l("div",{staticClass:"z-0 border-4 border-danger-color md:border-0 bg-white w-full md:w-72 h-64 md:mt-8 xl:ml-8 rounded-md relative shadow-lg hover:shadow-offer-1 transition-all duration-500 md:flex-none flex"},[l("div",{staticClass:"text-center px-4 md:border-4 md:border-danger-color md:rounded-md w-full h-full flex flex-col z-10 items-center justify-center"},[l("h5",{staticClass:"text-sm font-normal text-home-text-color-2 mb-4"},[e._v("Responsable - Service Consulting")]),e._v(" "),l("p",{staticClass:"text-base font-semibold text-danger-color"},[e._v("consulting@alyah-group.com")])])]),e._v(" "),l("div",{staticClass:"md:z-0 border-4 border-danger-color md:border-0 bg-white w-full md:w-72 h-64 md:mt-8 md:ml-8 rounded-md relative shadow-lg hover:shadow-offer-1 transition-all duration-500 z-0 md:flex-none flex"},[l("div",{staticClass:"text-center px-4 md:border-4 md:border-danger-color md:rounded-md w-full h-full flex flex-col z-10 items-center justify-center"},[l("h5",{staticClass:"text-sm font-normal text-home-text-color-2 mb-4"},[e._v("Responsable - Service Consulting")]),e._v(" "),l("p",{staticClass:"text-base font-semibold text-danger-color"},[e._v("consulting@alyah-group.com")])])]),e._v(" "),l("div",{staticClass:"md:z-0 border-4 border-danger-color md:border-0 bg-white w-full md:w-72 h-64 md:mt-8 md:ml-8 rounded-md relative shadow-lg hover:shadow-offer-1 transition-all duration-500 z-0 md:flex-none flex"},[l("div",{staticClass:"text-center px-4 md:border-4 md:border-danger-color md:rounded-md w-full h-full flex flex-col z-10 items-center justify-center"},[l("h5",{staticClass:"text-sm font-normal text-home-text-color-2 mb-4"},[e._v("Responsable - Service Consulting")]),e._v(" "),l("p",{staticClass:"text-base font-semibold text-danger-color"},[e._v("consulting@alyah-group.com")])])])]),e._v(" "),l("p",{staticClass:"text-lg text-white xl:px-40 md:px-8 md:my-auto my-8 space-y-8 flex flex-col items-center"},[l("span",{staticClass:"text-center"},[e._v("Alyah-Group est un grand group reconnu en France et partout dans le monde. Avec ses filiales et à travers un personnel et partenaires expérimentés Alyah-Group offre plusieurs services dans plusieurs domaines à savoir :")]),e._v(" "),l("span",{staticClass:"font-medium"},[e._v("Le conseil - Automobile - Rénovation - Espace vert - Le nettoyage industriel - Le soin à domicile")]),e._v(" "),l("span",[e._v("Nous sommes à votre entière disposition pour tous renseignements complémentaires.")])]),e._v(" "),l("section",{staticClass:"px-36 py-10 flex bg-partner filter hover:contrast-125 h-4"})])}],!1,null,null,null);t.default=component.exports}}]);
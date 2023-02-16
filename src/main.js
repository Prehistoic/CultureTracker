import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faArrowDownWideShort, faArrowDownShortWide, faBars, faExpand, faFilter, faHouse, faXmark, faPlus, faGear } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBars)
library.add(faXmark)
library.add(faHouse)
library.add(faExpand)
library.add(faFilter)
library.add(faArrowDownShortWide)
library.add(faArrowDownWideShort)
library.add(faPlus)
library.add(faGear)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
    .component("fa-icon", FontAwesomeIcon)
    .use(router)
    .mount('#app')

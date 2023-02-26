import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faArrowDownWideShort, faArrowDownShortWide, faBars, faExpand, faFilter, faHouse, faXmark, faPlus, faGear, faChevronLeft, faChevronRight, faLeftLong, faDownload, faUpload, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

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
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faLeftLong)
library.add(faDownload)
library.add(faUpload)
library.add(faFloppyDisk)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Toaster } from '@meforma/vue-toaster';

const app = createApp(App)
app.component("fa-icon", FontAwesomeIcon)
app.use(Toaster)
app.use(router)
app.mount('#app')
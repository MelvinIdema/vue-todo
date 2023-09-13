import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

library.add(faTrashCan);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.mount('#app')

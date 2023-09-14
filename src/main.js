import './assets/main.css'

import {createApp} from 'vue'
import {VueFire, VueFireFirestoreOptionsAPI} from 'vuefire'
import {firebaseApp} from '@/database'

import App from './App.vue'
import router from './router'
import store from './store'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {faTrashCan, faPlusSquare} from "@fortawesome/free-regular-svg-icons"

library.add(faTrashCan)
library.add(faPlusSquare)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireFirestoreOptionsAPI(),
    ]
});
app.use(store)
app.use(router)

router.isReady().then(() => {
    app.mount('#app');
});
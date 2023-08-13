import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './styles/app.css'; // Here
import router from './router'

import VueClipboard from 'vue-clipboard2'
import i18n from './i18n'


const app = createApp(App)

app.use(router).use(VueClipboard).use(i18n)


app.mount('#app')
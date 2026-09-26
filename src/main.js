import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import './css/global.css'

createApp(App)
  .use(router)
  .mount('#app')
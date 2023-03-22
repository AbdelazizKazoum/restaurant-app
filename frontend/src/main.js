import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

//import app css
import '@/assets/css/app.css';
// import router
import router from './router'


const app = createApp(App)
app.use(store);
  app.use(router)
  app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

//import app css
import '@/assets/css/app.css';
// import router
import router from './router'
import axios from 'axios';


const app = createApp(App)
axios.defaults.baseURL ='http://localhost:3000/api/' ;
axios.defaults.withCredentials = true;
app.use(store);
  app.use(router)
  app.mount('#app')

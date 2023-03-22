import { createRouter, createWebHistory } from "vue-router";

import dashboard from '../pages/master/dashboard'
import home from '../pages/home'
import profile from '../pages/profile'
import signup from '../pages/signup.vue'
import signin from '../pages/signin.vue'


const routes = [
  {
    path: '/',
    name: 'dashboard',
    component : dashboard,
    children : [
      {   
        name: 'home',
        path: '/home',
        component: home
      },
        {
        path: '/profile',
        name: 'profile',
        component : profile 
  },
  ]
},
{
  path : '/signin',
  name : 'signin',
  component : signin ,
},
{
  path : '/signup',
  name : 'signup',
  component : signup ,
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

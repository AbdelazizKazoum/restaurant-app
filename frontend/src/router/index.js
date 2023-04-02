import { createRouter, createWebHistory } from "vue-router";

import dashboard from '../pages/master/dashboard'
import home from '../pages/home'
import users from '../pages/users'
import signup from '../pages/signup.vue'
import signin from '../pages/signin.vue'
import products from '../pages/products.vue';


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
        path: '/users',
        name: 'users',
        component : users 
      },
      {
        path:'/products',
        name : 'products',
        component : products
      }
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

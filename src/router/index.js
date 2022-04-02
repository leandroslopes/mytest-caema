import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Cities from '../views/Cities.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/municipios',
    name: 'municipios',
    component: () => import('../views/Cities.vue')
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

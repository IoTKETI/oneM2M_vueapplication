import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateRS from '../components/createRS.vue'
import RetrieveRS from '../components/retrieveRS.vue'
import UpdateRS from '../components/updateRS.vue'
import DeleteRS from '../components/deleteRS.vue'
import notis from '../components/notificationRS.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',   
    component: Home
  },
  {
    path: '/CreateRS',
    name: 'CreateRS',
    component: CreateRS
  },
  {
    path: '/RetrieveRS',
    name: 'RetrieveRS',
    component: RetrieveRS
  },
  {
    path: '/UpdateRS',
    name: 'UpdateRS',
    component: UpdateRS
  },
  {
    path: '/deleteRS',
    name: 'DeleteRS',
    component: DeleteRS
  },
  {
    path: '/notis',
    name: 'notis',
    component: notis
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

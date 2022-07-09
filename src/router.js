import { createRouter, createWebHistory } from 'vue-router'
import AllRequests from './views/AllRequests/AllRequests.vue'

const routes = [
  {
    path: '/',
    redirect: {name: 'requests'}
  },
  {
    path: '/requests',
    name: 'requests',
    component: AllRequests
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }

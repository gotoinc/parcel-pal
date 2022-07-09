import { createRouter, createWebHistory } from 'vue-router'
import AllRequests from './views/AllRequests/AllRequests.vue'
import ChooseRequestType from './views/CreateRequest/children/ChooseRequestType.vue'
import CreateRequest from './views/CreateRequest/CreateRequest.vue'
import CreateOrderRequest from './views/CreateRequest/children/CreateOrderRequest.vue'
import CreateDeliverRequest from './views/CreateRequest/children/CreateDeliverRequest.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'requests' }
  },
  {
    path: '/requests',
    name: 'requests',
    component: AllRequests
  },
  {
    path: '/create',
    component: CreateRequest,
    children: [
      {
        path: '',
        name: 'choose-request-type',
        component: ChooseRequestType
      },
      {
        path: 'order',
        name: 'create-order-request',
        component: CreateOrderRequest
      },
      {
        path: 'delivery',
        name: 'create-delivery-request',
        component: CreateDeliverRequest
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }

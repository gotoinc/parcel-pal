import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'
import { orderRequestFactory, deliveryRequestFactory, makeRequestsHandlers } from './requests.js'
import { saveData, loadData } from './utils.js'


export function makeServer() {
  const initialData = loadData()

  return createServer({
    models: {
      orderRequest: Model.extend({
        user: belongsTo()
      }),
      deliveryRequest: Model.extend({
        user: belongsTo()
      }),
      user: Model.extend({
        orderRequests: hasMany(),
        deliveryRequests: hasMany()
      })
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.firstName()
        }
      }),
      orderRequest: orderRequestFactory,
      deliveryRequest: deliveryRequestFactory
    },

    serializers: {
      application: RestSerializer,
    },

    seeds(server) {
      if (initialData) {
        server.db.loadData(initialData)
      } else {
        server.createList('user', 10).forEach(user => {
          server.createList('deliveryRequest', 3, { user })
          server.createList('orderRequest', 3, { user })
        })

        saveData(server)
      }
    },

    routes() {
      this.timing = 1000
      this.namespace = '/api/v1'

      makeRequestsHandlers(this)

      this.namespace = ''
      this.passthrough()
    }
  })
}

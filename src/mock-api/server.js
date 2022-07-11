import { belongsTo, createServer, Factory, hasMany, Model, RestSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'
import { orderRequestFactory, deliveryRequestFactory, makeRequestsHandlers } from './requests.js'

export function makeServer() {
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
      server.createList('user', 10).forEach(user => {
        server.createList('deliveryRequest', 3, { user })
        server.createList('orderRequest', 3, { user })
      })
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

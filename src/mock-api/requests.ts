import { sample } from 'lodash'
import { constants } from '../constants.js'
import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'
import { saveData } from './utils.js'

const requestBaseFactory = {
  cityFrom() {
    return sample(constants.CITIES)
  },
  cityTo() {
    return sample(constants.CITIES)
  },
  createdAt() {
    return faker.date.recent(15)
  },
  dateOfDispatch() {
    return faker.date.recent(5)
  },
  type() {
    throw new Error('Order type must be specified')
  }
}

export const orderRequestFactory = Factory.extend({
  ...requestBaseFactory,
  type: 'order',
  parcelType() {
    return sample(constants.PARCEL_TYPES)
  },
  parcelDescription() {
    return faker.hacker.phrase()
  },
})

export const deliveryRequestFactory = Factory.extend({
  ...requestBaseFactory,
  type: 'delivery'
})

export function makeRequestsHandlers(server) {
  server.get('/requests/all', function(schema, request) {
    const { userId, sortBy, sortDirection } = request.queryParams
    let orderRequests
    let deliveryRequests

    if (userId) {
      const user = schema.users.findBy({id: userId})
      if (!user) {
        return []
      }
      orderRequests = user.orderRequests.models
      deliveryRequests = user.deliveryRequests.models
    } else {
      orderRequests = schema.orderRequests.all().models
      deliveryRequests = schema.deliveryRequests.all().models
    }

    let allRequests = [...orderRequests, ...deliveryRequests]

    if (sortBy) {
      allRequests = allRequests.sort((a, b) => {
        let aValue = isNaN(a[sortBy]) ? a[sortBy] : +a[sortBy]
        let bValue = isNaN(b[sortBy]) ? b[sortBy] : +b[sortBy]

        const condition = bValue > aValue
        return condition ? 1 : -1
      })
    } else {
      allRequests = allRequests.sort((a, b) => {
        const condition = new Date(b.createdAt) > new Date(a.createdAt)
        return condition ? 1 : -1
      })
    }

    if (sortBy && sortDirection !== 'descending') {
      allRequests.reverse()
    }

    return allRequests
  })

  server.del('/requests/:type/:id', function(schema, request) {
    const {type, id} = request.params
    const requestsModelName = `${type}Requests`

    schema[requestsModelName].find(id).destroy()

    saveData(server)

    return new Response(200)
  })

  server.patch('/requests/:type/:id', function(schema, request) {
    const {type, id} = request.params
    const requestModelNamePlural = `${type}Requests`
    const attrs = JSON.parse(request.requestBody)

    const updatedRequest = schema[requestModelNamePlural].find(id).update(attrs)

    saveData(server)

    return updatedRequest
  })

  server.post('/requests/:type/:userId', function(schema, request) {
    const {type, userId} = request.params
    const requestModelNamePlural = `${type}Requests`

    const attrs = JSON.parse(request.requestBody)._value
    let user = schema.users.find(userId)

    if (!user) {
      user = schema.users.create({id: userId})
    }

    schema[requestModelNamePlural].create({ user, type, ...attrs, id: null, createdAt: new Date() })

    saveData(server)

    return new Response(201)
  })
}

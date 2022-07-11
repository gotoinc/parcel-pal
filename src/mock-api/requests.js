import { sample } from 'lodash'
import { constants } from '../constants.js'
import { faker } from '@faker-js/faker'
import { Factory } from 'miragejs'

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
      orderRequests = this.serialize(user.orderRequests.all()).orderRequests
      deliveryRequests = this.serialize(user.deliveryRequests.all()).deliveryRequests
    } else {
      orderRequests = this.serialize(schema.orderRequests.all()).orderRequests
      deliveryRequests = this.serialize(schema.deliveryRequests.all()).deliveryRequests
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

    return new Response(200)
  })

  server.patch('/requests/:type/:id', function(schema, request) {
    const {type, id} = request.params
    const requestModelNamePlural = `${type}Requests`
    const requestModelName = `${type}Request`
    const attrs = JSON.parse(request.requestBody)

    const newRequest = this.serialize(schema[requestModelNamePlural].find(id).update(attrs))[requestModelName]

    return newRequest
  })
}

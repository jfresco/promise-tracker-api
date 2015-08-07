import debug from 'debug'
import server from '../server'
import error from 'boom'
import * as Subject from '../data/api/subject'

const log = debug('promise-tracker-api:api')

server.route({
  method: 'GET',
  path: '/api/subjects',
  config: {
    auth: false,
    cors: true,
    tags: ['subjects'],
    description: 'Get a list of all subjects',
    handler: (request, reply) => {
      log('GETting /api/subjects')
      Subject.all((err, docs) => {
        if (err) {
          log('Error: %s', err)
          return reply(err)
        }

        log('Delivering %d subjects', docs.length)
        reply(docs)
      })
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/subject/{id}',
  config: {
    auth: false,
    cors: true,
    description: 'Get one subject details',
    tags: ['subjects'],
    handler: (request, reply) => {
      log('GETting /api/subject/%s', request.params.id)
      Subject.findById(request.params.id, (err, doc) => {
        if (err) {
          log('Error: %s', err)
          return reply(err)
        }
        if (!doc) {
          return reply(error.badRequest(`Subject with ID ${request.params.id} not found`))
        }

        log('Delivering subject with ID %s', doc.id)
        return reply(doc)
      })
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/subject',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Creates a new subject',
    tags: ['subjects'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

server.route({
  method: 'PUT',
  path: '/api/subject/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Modifies an existing subject',
    tags: ['subjects'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

server.route({
  method: 'DELETE',
  path: '/api/subject/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Deletes a subject',
    tags: ['subjects'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

export default server
import debug from 'debug'
import server from '../server'
import error from 'boom'
import * as Predicate from '../data/api/predicate'

const log = debug('promise-tracker-api:api')

server.route({
  method: 'GET',
  path: '/api/subject/{subjectId}/promises',
  config: {
    auth: false,
    cors: true,
    tags: ['promises'],
    description: 'Gets a list of all promises of a certain subject',
    handler: (request, reply) => {
      log('GETting /api/promises')
      Predicate.all(request.params.subjectId, (err, docs) => {
        if (err) {
          log('Error: %s', err)
          return reply(err)
        }

        log('Delivering %d promises', docs.length)
        reply(docs)
      })
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/subject/{subjectId}/promise',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Adds a new promise to a subject',
    tags: ['promises'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

server.route({
  method: 'PUT',
  path: '/api/promise/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Modifies an existing promise',
    tags: ['promises'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

server.route({
  method: 'DELETE',
  path: '/api/promise/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Deletes a promise',
    tags: ['subjects'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

export default server

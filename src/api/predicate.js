import debug from 'debug'
import server from '../server'
import error from 'boom'
import * as Subject from '../data/api/subject'

const log = debug('promise-tracker-api:api')

server.route({
  method: 'GET',
  path: '/subject/{slug}/promises',
  config: {
    auth: false,
    cors: true,
    tags: ['api', 'promises'],
    description: 'Gets a list of all promises of a certain subject',
    handler: (request, reply) => {
      log('GETting /api/promises')
      Subject.getPromises(request.params.slug, (err, docs) => {
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
  path: '/subject/{slug}/promise',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Adds a new promise to a subject',
    tags: ['api', 'promises'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

server.route({
  method: 'PUT',
  path: '/promise/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Modifies an existing promise',
    tags: ['api', 'promises'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

server.route({
  method: 'DELETE',
  path: '/promise/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Deletes a promise',
    tags: ['api', 'subjects'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

export default server

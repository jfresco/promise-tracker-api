import debug from 'debug'
import server from '../server'
import error from 'boom'
import * as Subject from '../data/api/subject'

const log = debug('promesometro:api')

server.route({
  method: 'GET',
  path: '/api/test',
  handler: (request, reply) => {
    reply('hello world')
  }
})

server.route({
  method: 'GET',
  path: '/api/subjects',
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
})

server.route({
  method: 'GET',
  path: '/api/subject/{id}',
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
})

export default server

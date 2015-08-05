import debug from 'debug'
import server from '../server'
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

export default server

import debug from 'debug'
import Joi from 'joi'
import server from '../server'
import error from 'boom'
import * as Subject from '../data/api/subject'

const log = debug('promise-tracker-api:api')

server.route({
  method: 'GET',
  path: '/subjects',
  config: {
    auth: false,
    cors: true,
    tags: ['api', 'subjects'],
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
  path: '/subject/{slug}',
  config: {
    auth: false,
    cors: true,
    description: 'Get one subject details',
    tags: ['api', 'subjects'],
    handler: (request, reply) => {
      log('GETting /api/subject/%s', request.params.id)
      Subject.findBySlug(request.params.slug, (err, doc) => {
        if (err) {
          log('Error: %s', err)
          return reply(err)
        }
        if (!doc) {
          return reply(error.badRequest('Subject with slug ' + request.params.slug + ' not found'))
        }

        log('Delivering subject with ID %s', doc.id)
        return reply(doc)
      })
    }
  }
})

server.route({
  method: 'POST',
  path: '/subject',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Creates a new subject',
    validate: {
      payload: {
        slug: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        begin: Joi.date(),
        end: Joi.date().required()
      }
    },
    tags: ['api', 'subjects'],
    handler: (request, reply) => {
      log('Request: %j', request.auth)
      const role = request.auth.credentials.role
      if (role !== 'owner' && role !== 'collaborator') {
        return reply(error.unauthorized('You are not allowed to do this'))
      }

      request.payload.creator = request.auth.credentials.userName
      Subject.create(request.payload, (err, subject) => {
        if (err) {
          log('Error creating subject: %s', err)
          return reply(error.badRequest(err))
        }
        reply(subject)
      })
    }
  }
})

server.route({
  method: 'PUT',
  path: '/subject/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Modifies an existing subject',
    tags: ['api', 'subjects'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

server.route({
  method: 'DELETE',
  path: '/subject/{id}',
  config: {
    auth: 'jwt',
    cors: true,
    description: 'Deletes a subject',
    tags: ['api', 'subjects'],
    handler: (request, reply) => reply(error.notImplemented('yet not implemented'))
  }
})

export default server

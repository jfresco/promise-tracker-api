import debug from 'debug'
import error from 'boom'
import Joi from 'joi'
import JWT from 'jsonwebtoken'
import config from '../config'
import { encrypt, decrypt } from '../util/crypt'
import server from '../server'
import * as User from '../data/api/user'

const log = debug('promise-tracker-api:api:user')

server.route({
  method: 'POST',
  path: '/user',
  config: {
    validate: {
      payload: {
        userName: Joi.string().email().required(),
        password: Joi.string().required()
      }
    },
    auth: false,
    tags: ['api', 'user'],
    description: 'Creates a new user',
    handler: (request, reply) => {
      log('POSTing to /user')
      User.create({
        handle: request.payload.userName,
        password: encrypt(request.payload.password),
        // todo: set it to true only when email is verified
        verified: true
      }, (err, doc) => {
        if (err) {
          log('Error creating user: %s', err.errmsg)
          if (err.code === 11000 || err.code === 11001) {
            reply(error.forbidden('Please provide other e-mail'))
          } else {
            reply(error.forbidden(err))
          }
        }

        log('User %s created', doc.handle)
        // todo: send verification email
        reply({ id: doc._id, handle: doc.handle })
      })
    }
  }
})

server.route({
  method: 'POST',
  path: '/login',
  config: {
    validate: {
      payload: {
        userName: Joi.string().email().required(),
        password: Joi.string().required()
      }
    },
    auth: false,
    tags: ['api', 'user'],
    description: 'Validates user name and password and returns a session token',
    handler: (request, reply) => {
      log('POSTing /login for %s', request.payload.userName)
      User.validate({
        handle: request.payload.userName,
        password: request.payload.password
      }, (err, user) => {
        if (err) {
          log('Error: %s', err)
          reply(error.forbidden(err))
        }
        const tokenData = {
          userName: user.handle,
          scope: [user.scope],
          id: user._id
        }
        const res = {
          userName: user.handle,
          scope: user.scope,
          token: JWT.sign(tokenData, config.secret)
        }

        log('Password is ok, returning data: %j', res)
        reply(res)
      })
    }
  }
})

export default server

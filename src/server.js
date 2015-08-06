import debug from 'debug'
import Hapi from 'hapi'
import jwt from 'hapi-auth-jwt2'
import config from './config'

const log = debug('promesometro:server')

const server = new Hapi.Server()

/**
 * Configure the server
 */

server.connection({
  port: config.port
})

/**
 * Set up JSON Web Tokens handling
 */

server.register(jwt, err => {
  if (err) {
    return log('Error registering jwt: %s', err)
  }

  server.auth.strategy('jwt', 'jwt', true, {
    key: config.secret,
    // Let's assume that if it's decoded, it's valid
    validateFunc: (decoded, request, cb) => cb(null, decoded.id),
    verifyOptions: { algorithms: ['HS256'] }
  })
})

/**
 * Expose the server instance, as a singleton
 */

export default server

import debug from 'debug'
import server from './src/api'
import mongoose from 'mongoose'

const log = debug('promesometro:main')

/*
 * Bootstrap database connection
 */

log('Connecting to database')
mongoose.connect('mongodb://localhost/promesas')

/*
 * Server static files
 */

server.route({
  method: 'GET',
  path: '/{filename}',
  handler: {
    file: request => request.params.filename
  }
})

/*
 * Launch server
 */

log('Launching server')
server.start(err => {
  if (err) {
    log('Server not launched due to an error')
    throw err
  }

  log('Server started in port %d', server.info.port)
})

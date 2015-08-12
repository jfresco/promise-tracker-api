import debug from 'debug'
import './src/api'
import server from './src/server'
import mongoose from 'mongoose'
import config from './src/config'

const log = debug('promise-tracker-api:main')

/*
 * Bootstrap database connection
 */

log('Connecting to database')
mongoose.connect(config.dbURI)

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

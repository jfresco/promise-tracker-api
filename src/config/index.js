const env = process.env

export default {
  appName: env.APP_NAME || 'Promise Tracker API',
  port: env.PORT || 8000,
  dbURI: env.DB_URI || env.MONGO_URL || env.MONGOLAB_URI || 'mongodb://localhost/promisetracker',
  secret: env.SECRET || 'change this string'
}

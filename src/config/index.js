const env = process.env

export default {
  appName: env.APP_NAME || 'Promesometro dev',
  port: env.PORT || 8000,
  secret: env.SECRET || 'change this string'
}

import Hapi from 'hapi'

const server = new Hapi.Server()
server.connection({
  port: process.env.PORT || 8000
})

export default server

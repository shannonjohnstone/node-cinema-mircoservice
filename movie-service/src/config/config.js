
const dbSettings = {
  db: process.env.MONGODB_APPLICATION_DATABASE || 'movies',
  username: process.env.MONGODB_APPLICATION_USER || 'shannon',
  password: process.env.MONGODB_APPLICATION_PASS || 'abc123',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'mongorsn1:27017'
  ],
  parameters: () => ({
    w: 'majority',
    wtimeout: 60000,
    j: true,
    readPreference: 'ReadPreference.SECONDARY_PREFERRED',
    native_parser: false,
    autoReconnect: true,
    poolSize: 10,
    keepAlive: 300,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 60000
  })
}

const serverSettings = {
  port: process.env.PORT || 3000
}

module.exports = {
  dbSettings,
  serverSettings
}

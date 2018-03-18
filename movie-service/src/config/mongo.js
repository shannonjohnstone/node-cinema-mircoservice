const MongoClient = require('mongodb')

const getMongoUrl = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', 'mongodb://')

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options, mediator) => {
  console.log(options, 'connect...')

  mediator.once('boot.ready', () => {
    MongoClient.connect(`mongodb://${options.user}:${options.password}@localhost:27017/movies`, {
      ...options.dbParameters(),
      ...options.serverParameters()
    }, (err, client) => {
      if (err) {
        return mediator.emit('db.error', err)
      }
      //   console.log(client.db(), 'client.db');
      mediator.emit('db.ready', client.db())
    })
  })
}

module.exports = {
  connect
}

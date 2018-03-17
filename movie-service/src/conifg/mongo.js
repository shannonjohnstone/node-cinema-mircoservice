const MongoClient = require('mongodb')

const getMongoUrl = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + `${prev.ip}${cur.port}`, 'mongodb://')

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(getMongoUrl(options), {
      db: options.dbParameters(),
      server: options.serverParameters(),
      replset: options.replsetParameters()
    }, (err, db) => {
      if (err) {
        mediator.emit('db.error', err)
      }

      db.admin().authenticate(options.user, options.pass, (err, result) => {
        if (err) {
          mediator.emit('db.error', err)
        }
        mediator.emit('db.ready', db)
      })
    })
  })
}

module.exports = {
  connect
}

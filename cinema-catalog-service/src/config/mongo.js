const MongoClient = require('mongodb')
const { dbSettings } = require('./config')

const { events } = require('../constants')

const connect = (options, mediator) => {
  mediator.once(events.BOOT_READY, () => {
    MongoClient.connect(`mongodb://${options.username}:${options.password}@${dbSettings.servers}/${dbSettings.db}`, {
      ...options.parameters()
    }, (err, client) => {
      if (err) return mediator.emit(events.DB_ERROR, err)
      mediator.emit(events.DB_READY, client.db())
    })
  })
}

module.exports = {
  connect
}

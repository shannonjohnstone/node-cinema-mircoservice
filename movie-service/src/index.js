const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config')
const { events } = require('./constants')
const mediator = new EventEmitter()

// logging when service starts
console.log('--- Movies Service ---')
console.log(`--- ${config.serverSettings.nodeEnv} ---`)
console.log('Connecting to movies repository...')

// log unhandled execeptions
process.on('uncaughtException', (err) => {
  console.error('Unhandled Rejection', err)
})

// event listener for when respoitory has been connected
mediator.on(events.DB_READY, async (db) => {
  let rep
  let app

  try {
    const repo = await repository.connect(db)
    console.log('Repository Connected. Starting server')

    rep = repo
    app = await server.start(config.serverSettings, repo)
  } catch (e) {
    console.log(`Server start error, err: ${e}`)
  }

  app.on('close', () => {
    console.log('app.on -> close')
    return rep.disconnect
  })
})

mediator.on(events.DB_ERROR, (err) => console.error(err))

config.db.connect(config.dbSettings, mediator)
mediator.emit(events.BOOT_READY)

const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config')
const mediator = new EventEmitter()

// logging when service starts
console.log('--- Movies Service ---')
console.log('Connecting to movies repository...')

// log unhandled execeptions
process.on('uncaughtException', (err) => {
  console.error('Unhandled Rejection', err)
})

async function start (port, repo) {
  try {
    return await server.start({ port, repo })
  } catch (e) {
    console.log(e)
  }
}

// event listener for when respoitory has been connected
mediator.on('db.ready', async (db) => {
  let rep
  let app

  try {
    const repo = await repository.connect(db)
    console.log('Repository Connected. Starting server')
    rep = repo
    app = await start(config.serverSettings.port, repo)
  } catch (e) {
    console.log(`Server start error, err: ${e}`)
  }

  app.on('close', () => {
    console.log('app.on -> close')
    return rep.disconnect
  })
})

mediator.on('db.error', (err) => console.error(err))

config.db.connect(config.dbSettings, mediator)
mediator.emit('boot.ready')

const server = require('./server/server.js')

async function start () {
  try {
    await server.start({ port: 3000 })
  } catch (e) {
    console.log(e)
  }
}

start()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.port) return reject(new Error('The server must be started on an avaliable port'))

    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error(`Something went wrong! err: ${err}`))
      res.status(500).send('Something went wrong')
    })

    // TODO: api to go here
    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = {
  start
}

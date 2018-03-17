const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const start = ({ port } = {}) => {
  return new Promise((resolve, reject) => {
    if (!port) return reject(new Error('The server must be started on an avaliable port'))

    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error(`Something went wrong! err: ${err}`))
      res.status(500).send('Something went wrong')
    })

    // TODO: api to go here, current home route is just temp to see things are working
    app.get('/', (req, res) => res.json({ api: 'cinema v1' }))

    const server = app.listen(port, () => {
      console.log(`Server start at http://localhost:${port}`)
      return resolve(server)
    })
  })
}

module.exports = {
  start
}
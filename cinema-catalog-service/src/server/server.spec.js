/* eslint-env mocha */
/* eslint-disable no-unused-vars */

const should = require('should')
const server = require('./server')

describe('Server', () => {
  it('should require a port number to start', () => {
    server.start({}, {}).should.be.rejectedWith(/port/)
  })
  it('should require a nodeEnv to start', () => {
    server.start({ port: 3000 }, {}).should.be.rejectedWith(/NODE_ENV/)
  })
  it('should require a repo to start', () => {
    server.start({ port: 3000, nodeEnv: 'development' }).should.be.rejectedWith(/repository/)
  })
})

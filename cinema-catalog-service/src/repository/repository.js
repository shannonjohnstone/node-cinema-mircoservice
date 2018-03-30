const repository = (db) => {
  return true
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) reject(new Error('connection db not supplied!'))
    resolve(repository(connection))
  })
}

module.exports = {
  connect
}

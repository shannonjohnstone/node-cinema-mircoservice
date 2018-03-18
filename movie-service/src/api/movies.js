const controllers = require('./controllers')

module.exports = (app, options) => {
  const { repo } = options

  app.get('/movies', (req, res, next) => controllers.getAllMovies(req, res, next, repo))
}

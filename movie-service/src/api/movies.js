const controllers = require('./controllers')

module.exports = (app, options) => {
  const { repo } = options

  const { getAllMovies, getPremieres, getMovieById } = controllers(repo)

  app.get('/movies', getAllMovies)
  app.get('/movies/premieres', getPremieres)
  app.get('/movies/:id', getMovieById)
}

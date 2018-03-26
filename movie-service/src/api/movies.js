const controllers = require('./controllers')

module.exports = (app, options) => {
  const { repo } = options

  const { getAllMovies, getMoviePremiers, getMovieById } = controllers(repo)

  app.get('/movies', getAllMovies)
  app.get('/movies/premiers', getMoviePremiers)
  app.get('/movies/:id', getMovieById)
}

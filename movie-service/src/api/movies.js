const status = require('http-status')

module.exports = (app, options) => {
  const { repo } = options

  console.log('in movies api', options);
  app.get('/movies', async (req, res, next) => {
    try {
      const movies = await repo.getAllMovies()
      res.status(status.OK).json(movies)
    } catch (e) {
      console.log(`Error occured in api/movies: getAllMovies, err: ${e}`)
      next()
    }
  })
}

const status = require('http-status')

module.exports = (repo) => {
  return {
    async getAllMovies (req, res, next) {
      try {
        const movies = await repo.getAllMovies()
        res.status(status.OK).json(movies)
      } catch (e) {
        console.log(`Error occured in api/movies: getAllMovies, err: ${e}`)
        next()
      }
    },
    async getMoviePremiers (req, res, next) {
      try {
        const premieres = await repo.getMoviePremiers()
        res.status(status.OK).json(premieres)
      } catch (e) {
        console.log(`Error occured in api/movies/premieres: getMoviePremiers, err: ${e}`)
        next()
      }
    },
    async getMovieById (req, res, next) {
      try {
        const movie = await repo.getMovieById(req.params.id)
        res.status(status.OK).json(movie)
      } catch (e) {
        console.log(`Error occured in api/movie/${req.params.id}: getMovieById, err: ${e}`)
        next()
      }
    }
  }
}

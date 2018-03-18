const status = require('http-status')

module.exports.getAllMovies = async (req, res, next, repo) => {
  try {
    const movies = await repo.getAllMovies()
    res.status(status.OK).json(movies)
  } catch (e) {
    console.log(`Error occured in api/movies: getAllMovies, err: ${e}`)
    next()
  }
}

/* eslint-env mocha */
/* eslint-disable no-unused-vars */

const request = require('supertest')
const server = require('../server/server')

describe('Movies API', () => {
  let app = null
  let testMovies = [{
    'id': '3',
    'title': 'xXx: Reactivado',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 20
  }, {
    'id': '4',
    'title': 'Resident Evil: Capitulo Final',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 27
  }, {
    'id': '1',
    'title': 'Assasins Creed',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 6
  }]

  let testRepo = {
    getAllMovies () {
      return Promise.resolve(testMovies)
    },
    getMoviePremiers () {
      return Promise.resolve(testMovies.filter(movie => movie.releaseYear === 2017))
    },
    getMovieById (id) {
      return Promise.resolve(testMovies.filter(movie => movie.id === id))
    }
  }

  beforeEach(() => {
    return server.start({ port: 3000, nodeEnv: 'development' }, testRepo)
      .then(server => {
        app = server
      })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('should return all movies', (done) => {
    request(app)
      .get('/movies')
      .expect(res => {
        res.body.should.containEql(testMovies[0])
      }).expect(200, done)
  })

  it('can get movie premiers', (done) => {
    request(app)
      .get('/movies/premiers')
      .expect((res) => {
        res.body.should.containEql(testMovies[2])
      }).expect(200, done)
  })

  it('should return a valid movie from a valid id', (done) => {
    request(app)
      .get('/movies/1')
      .expect(res => res.body.should.containEql(testMovies[2]))
      .expect(200, done)
  })
})

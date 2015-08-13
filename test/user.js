import chai from 'chai'
import supertest from 'supertest'

const should = chai.should()
const api = supertest('http://localhost:8000')

describe('User', () => {
  it('is created', done => {
    api
      .post('/user')
      .field('userName', 'pepe@example.com')
      .field('password', 'xyz123')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        const user = res.body
        user.should.be.an('object')
        user.should.have.property('id')
        user.should.have.property('handle')
        done()
      })
  })

  it('signs in', done => {
    api
      .post('/login')
      .field('userName', 'pepe@example.com')
      .field('password', 'xyz123')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})
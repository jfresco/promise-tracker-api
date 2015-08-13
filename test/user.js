import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'
import config from '../src/config'
import * as db from '../src/data/api/user'

const should = chai.should()
const api = supertest('http://localhost:8000')

describe('User API', () => {
  it('can create a new user', done => {
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

  it('can sign in a user', done => {
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

  it('should fail sign in with wrong password', done => {
    api
      .post('/login')
      .field('userName', 'pepe@example.com')
      .field('password', 'abc987')
      .expect(403)
      .end(done)
  })

  it('should fail sign in with wrong username', done => {
    api
      .post('/login')
      .field('userName', 'cacho@example.com')
      .field('password', 'xyz123')
      .expect(403)
      .end(done)
  })

  after(done => {
    mongoose.connect(config.dbURI)
    db.remove({ handle: 'pepe@example.com' }, () => {
      mongoose.disconnect()
      done()
    })
  })
})
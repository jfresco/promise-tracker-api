import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'
import config from '../src/config'
import * as SubjectData from '../src/data/api/subject'
import * as UserData from '../src/data/api/user'

const should = chai.should()
const api = supertest('http://localhost:8000')
let token = ''

describe('Subject API', () => {
  before(done => {
    // We create a user and get the login token
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

        api
          .post('/login')
          .field('userName', 'pepe@example.com')
          .field('password', 'xyz123')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            token = res.body.token
            done()
          })
      })
  })

  after(done => {
    // Remove documents created in this tests
    mongoose.connect(config.dbURI)
    SubjectData.remove({ slug: 'cacho' }, () => {
      UserData.remove({ handle: 'pepe@example.com'}, () => {
        mongoose.disconnect()
        done()
      })
    })
  })

  it('can return a list of subjects', done => {
    api
    .get('/subjects')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      res.body.should.be.instanceof(Array)
      done()
    })
  })

  it('can get a subject by slug', done => {
    api
    .get('/subject/hector')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      const subject = res.body
      subject.should.be.an('object')
      subject.should.have.property('slug')
      subject.should.have.property('_id')
      subject.should.have.property('name')
      subject.should.have.property('description')
      subject.should.have.property('begin')
      subject.should.have.property('end')

      done()
    })
  })

  it('can create a new subject', done => {
    api
      .post('/subject')
      .set('Authorization', token)
      .field('slug', 'cacho')
      .field('name', 'Cachito Vigil')
      .field('description', 'Cachito Emperador de la Galaxia')
      .field('end', '2018-11-14')
      .expect(200)
      .end(done)
  })
})
import chai from 'chai'
import supertest from 'supertest'

const should = chai.should()
const api = supertest('http://localhost:8000')

describe('subject', () => {
  it('should return a list of subjects', done => {
    api
    .get('/api/subjects')
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

  it('should get a subject by id', done => {
    api
    .get('/api/subject/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        return done(err)
      }

      res.body.should.be.an('object')
        .and.have.property('id')
        .and.have.property('identifier')
        .and.have.property('name')
        .and.have.property('description')
        .and.have.property('begin')
        .and.have.property('end')

      done()
    })
  })
})
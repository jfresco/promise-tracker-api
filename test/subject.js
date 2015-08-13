import chai from 'chai'
import supertest from 'supertest'

const should = chai.should()
const api = supertest('http://localhost:8000')

describe('Subject API', () => {
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
})
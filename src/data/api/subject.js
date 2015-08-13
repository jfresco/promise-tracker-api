import debug from 'debug'
import Subject from '../models/subject'
import * as User from './user'

const log = debug('promise-tracker-api:data:api:subject')
const publicFields = 'id slug name description begin end'

export function all (cb) {
  Subject
    .find({})
    .select(publicFields)
    .exec((err, res) => cb(err, res))
}

export function findById (id, cb) {
  Subject
    .findOne({ id: id })
    .select(publicFields)
    .exec((err, res) => cb(err, res))
}

export function findBySlug (slug, cb) {
  Subject
    .findOne({ slug: slug })
    .select(publicFields)
    .exec((err, res) => cb(err, res))
}

export function getPromises (slug, cb) {
  Subject
    .find({ slug: slug })
    .populate('promises')
    .exec((err, res) => cb(err, res))
}

export function create (data, cb) {
  User.findByHandle(data.creator, (err, user) => {
    if (err) {
      return cb(err)
    } else if (!user) {
      return cb(new Error('User not found'))
    }

    let subject = new Subject({
      slug: data.slug,
      name: data.name,
      description: data.description,
      end: data.end,
      creator: user
    })

    if (data.begin) {
      subject.begin = data.begin
    }

    subject.save(cb)
  })
}

export function remove (query, cb) {
  Subject.findOneAndRemove(query, cb)
}

export default Subject

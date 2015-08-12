import debug from 'debug'
import Subject from '../models/subject'

const log = debug('promise-tracker-api:data:api:subject')

export function all (cb) {
  Subject
    .find({})
    .select('id slug name description begin end')
    .exec((err, res) => cb(err, res))
}

export function findById (id, cb) {
  Subject
    .findOne({ id: id })
    .select('id slug name description begin end')
    .exec((err, res) => cb(err, res))
}

export function findBySlug (slug, cb) {
  Subject
    .findOne({ slug: slug })
    .select('id slug name description begin end')
    .exec((err, res) => cb(err, res))
}

export function getPromises (slug, cb) {
  Subject
    .find({ slug: slug })
    .populate('promises')
    .exec((err, res) => cb(err, res))
}

export default Subject

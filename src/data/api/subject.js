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

export default Subject

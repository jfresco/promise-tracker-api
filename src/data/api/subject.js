import debug from 'debug'
import Subject from '../models/subject'

const log = debug('promise-tracker-api:data:api:subject')

export function all (cb) {
  Subject
    .find({})
    .select('id identifier name description begin end')
    .exec((err, res) => cb(err, res))
}

export function findById (id, cb) {
  Subject
    .findOne({ id: id })
    .select('id identifier name description begin end')
    .exec((err, res) => cb(err, res))
}

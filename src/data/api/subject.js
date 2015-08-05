import debug from 'debug'
import Subject from '../models/subject'

const log = debug('promesometro:data:api:subject')

export function all (cb) {
  Subject
    .find({})
    .exec((err, res) => cb(err, res))
}

export function findById (id, cb) {
  Subject
    .findOne({ id: id })
    .exec((err, res) => cb(err, res))
}
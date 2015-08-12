import debug from 'debug'
import Subject from '../models/subject'
// import Predicate from '../models/predicate'

const log = debug('promise-tracker-api:data:api:predicate')

export function all (subjectId, cb) {
  Subject
    .find({ id: subjectId })
    .populate('promises')
    .exec((err, res) => cb(err, res))
}

// export function findById (id, cb) {
//   Predicate
//     .findOne({ id: id })
//     .exec((err, res) => cb(err, res))
// }

// export default Predicate

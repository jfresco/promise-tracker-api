import { decrypt } from '../../util/crypt'
import User from '../models/user'

export function create (data, cb) {
  let user = new User(data)
  user.save(err => {
    if (err) {
      return cb(err)
    } else {
      return cb(null, user)
    }
  })
}

export function validate (data, cb) {
  return User
    .findOne({ handle: data.handle })
    .select('_id handle name password scope verified')
    .exec((err, user) => {
      if (err) {
        return cb(err)
      } else if (!user) {
        return cb(new Error('Invalid user name'))
      } else if (data.password === decrypt(user.password)) {
        delete user.password
        return cb(null, user)
      } else {
        return cb(new Error('Invalid password'))
      }
    })
}

export default User

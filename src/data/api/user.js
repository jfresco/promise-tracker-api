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

export default User

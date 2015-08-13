import crypto from 'crypto'
import config from '../config'

export function decrypt (password) {
  var decipher = crypto.createDecipher('aes-256-ctr', config.secret)
  var dec = decipher.update(password, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

export function encrypt (password) {
  var cipher = crypto.createCipher('aes-256-ctr', config.secret)
  var crypted = cipher.update(password, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

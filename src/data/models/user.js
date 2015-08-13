import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema({
  handle: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scope: { type: String, enum: ['owner', 'collaborator'] },
  verified: { type: Boolean, default: false }
})

export default mongoose.model('User', User)

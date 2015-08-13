import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema({
  handle: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['owner', 'collaborator'] },
  verified: { type: Boolean, default: false }
})

export default mongoose.model('User', User)

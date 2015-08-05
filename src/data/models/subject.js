import mongoose from 'mongoose'
import Predicate from './predicate'

const Schema = mongoose.Schema

var Subject = new Schema({
  identifier: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  begin: { type: Date, default: Date.now, required: true },
  end: { type: Date, required: true },
  promises: [Predicate]
})

export default mongoose.model('Subject', Subject)

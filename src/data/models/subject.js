import mongoose from 'mongoose'
const Schema = mongoose.Schema

var Subject = new Schema({
  name: { type: String }
})

export default mongoose.model('Subject', Subject)

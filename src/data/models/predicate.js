import mongoose from 'mongoose'

const Schema = mongoose.Schema

var Predicate = new Schema({
  statement: { type: String, required: true },
  fulfillment: { type: Number, default: 0, min: 0, max: 100 },
  impossible: { type: Boolean, default: false },
  lastUpdate: { type: Date, default: Date.now }
})

export default mongoose.model('Predicate', Predicate)

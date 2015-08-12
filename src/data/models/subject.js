import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Predicate = new Schema({
  statement: { type: String, required: true },
  fulfillment: { type: Number, default: 0, min: 0, max: 100 },
  impossible: { type: Boolean, default: false },
  lastUpdate: { type: Date, default: Date.now }
})

const Subject = new Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  begin: { type: Date, default: Date.now, required: true },
  end: { type: Date, required: true },
  promises: [Predicate]
})

Subject.index({ slug: -1 })

export default mongoose.model('Subject', Subject)

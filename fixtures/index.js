import mongoose from 'mongoose'
import config from '../src/config'

// Fixtures
import subjects from './subjects'
// import predicates from './predicates'

// Data APIs
import Subject from '../src/data/api/subject'
// import Predicate from '../src/data/api/predicate'

function write (msg) {
  console.log(msg)
}

mongoose.connect(config.dbURI)
write('Connected to DB')

Subject.create(subjects, (err, docs) => {
  if (err) {
    write(err.message)
  } else {
    write('Wrote ' + docs.length + ' documents')
  }
  mongoose.disconnect()
  write('Disconnected')
})

import mongoose from 'mongoose'
import config from '../src/config'

// Fixtures
import subjects from './subjects'

// Data API
import Subject from '../src/data/api/subject'

function write (msg) {
  /*eslint no-console:0*/
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

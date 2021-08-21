let db

if (process.env.NODE_ENV === 'test') {
  db = require('../mocks/mockDB')
} else {
  db = require('./db')
}

module.exports = db

let api

if (process.env.NODE_ENV === 'test') {
  api = require('./mocks/mockAPI')
} else {
  api = require('./api')
}

module.exports = api

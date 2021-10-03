const originalAuth = require('../auth')

exports.listen = originalAuth.listen

exports.validateJWT = (req) => {
  const token = req.cookies.token

  return !!token && token === 'test-token'
}

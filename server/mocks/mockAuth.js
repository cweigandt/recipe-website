exports.listen = () => {}

exports.validateJWT = (req) => {
  const token = req.cookies.token

  return !!token && token === 'test-token'
}

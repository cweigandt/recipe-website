module.exports = (mock, prod) => {
  let module

  if (process.env.NODE_ENV === 'test') {
    module = require(mock)
  } else {
    module = require(prod)
  }

  return module
}

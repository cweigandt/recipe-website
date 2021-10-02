exports.imageMiddleware = (req, res, next) => {
  next()
}

exports.saveThumbnail = (req, res) => {
  return new Promise((resolve, reject) => {
    resolve('/thumbnail/location.jpg')
  })
}

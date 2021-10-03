const express = require('express')
const multer = require('multer')

exports.imageMiddleware = multer().single('image')

exports.saveThumbnail = (req, res) => {
  return new Promise((resolve, reject) => {
    resolve('/thumbnail/location.jpg')
  })
}

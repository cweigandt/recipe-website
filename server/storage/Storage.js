const multer = require('multer')
const multerGoogleStorage = require('multer-google-storage')
const { Storage } = require('@google-cloud/storage')

const auth = require('./auth')

const mime = require('mime')
const Jimp = require('jimp')

  const multerStorage = multerGoogleStorage.storageEngine({
    keyFilename: './server/credentials/gcs-credentials.json',
    bucket: 'recipe-website-269020.appspot.com',
    projectId: 'recipe-website-269020',
    acl: 'publicRead',
    filename: function (req, file, cb) {
      if (!auth.validateJWT(req)) {
        return null
      }

      if (file) {
        cb(
          null,
          'public/img/' +
            req.body.name.replace(/ /g, '_') +
            '.' +
            mime.getExtension(file.mimetype)
        )
      }
    },
  })

  const uploadStorage = new Storage({
    keyFilename: './server/credentials/gcs-credentials.json',
    projectId: 'recipe-website-269020',
  })

  const uploadHandler = multer({
    storage: multerStorage,
  })

  module.exports.imageMiddleware = uploadHandler.single('image');

  /**
   * Saves thumbnail to GCS and returns a promise that resolves to the url
   *
   * @param  {Request} req
   * @return {Promise} Resolves to url of saved thumbnail
   */
  module.exports.saveThumbnail = async (req, res, recipeName, fullImagePath) => {
    let imagePath = fullImagePath

    // Use the request's image path if none provided
    if (!imagePath && req.file && req.file.path) {
      imagePath = req.file.path
    }

    if (imagePath) {
      //this resizes the image
      const file = await Jimp.read(imagePath).then(async (image) => {
        image.resize(350, Jimp.AUTO)
        return image.getBufferAsync(Jimp.AUTO)
      })

      const recipeTitle = recipeName || req.body.name
      const extension = req.file
        ? mime.getExtension(req.file.mimetype)
        : mime.getExtension(mime.getType(imagePath))
      const thumbnailImagePath =
        'public/img/' +
        recipeTitle.replace(/ /g, '_') +
        '_thumbnail.' +
        extension
      await uploadImage(file, thumbnailImagePath).then((str) => {
        console.log(str)
      })
      return (
        'https://recipe-website-269020.appspot.com.storage.googleapis.com/' +
        thumbnailImagePath
      )
    }
    return ''
  }

  const uploadImage = (imageBuffer, imagePath) =>
    new Promise((resolve, reject) => {
      const blob = uploadStorage
        .bucket('recipe-website-269020.appspot.com')
        .file(imagePath)

      const blobStream = blob.createWriteStream({
        resumable: false,
      })

      blobStream
        .on('finish', () => {
          blob.makePublic((err, apiResponse) => {
            if (err) {
              reject(err.message)
            }
          })
          resolve('Successful image upload')
        })
        .on('error', (err) => {
          console.log(err)
          reject(`Unable to upload image, something went wrong`)
        })
        .end(imageBuffer)
    })
}

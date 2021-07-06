const customDB = require('./db')
const multer = require('multer')
const multerGoogleStorage = require('multer-google-storage')
const { Storage } = require('@google-cloud/storage')

const mime = require('mime')
const Jimp = require('jimp')

module.exports = function (app) {
  let multerStorage = multerGoogleStorage.storageEngine({
    keyFilename: './server/credentials/gcs-credentials.json',
    bucket: 'recipe-website-269020.appspot.com',
    projectId: 'recipe-website-269020',
    acl: 'publicRead',
    filename: function (req, file, cb) {
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

  app.post(
    '/upload-recipe',
    uploadHandler.single('image'),
    async function (req, res, next) {
      saveThumbnail(req, res).then((thumbnail) => {
        try {
          customDB.handleUploadForm(req.body, req.file, thumbnail)
          res.status(200)
          res.redirect('back')
        } catch (err) {
          res.status(500)
          res.send({ err: { msg: err.message, stack: err.stack } })
        }
      })
    }
  )

  app.post(
    '/edit-recipe',
    uploadHandler.single('image'),
    async function (req, res, next) {
      saveThumbnail(req, res).then((thumbnail) => {
        try {
          customDB.handleEditForm(req.body, req.file, thumbnail)
          res.status(200)
          res.redirect('back')
        } catch (err) {
          res.status(500)
          res.send({ err: { msg: err.message, stack: err.stack } })
        }
      })
    }
  )

  app.get('/createAllThumbnails', async function (req, res, next) {
    // This code is here for a template
    res.redirect('/')
    return

    let handled = 0
    await customDB
      .getAllRecipes()
      .then((recipes) => {
        recipes.forEach(async (recipe, index) => {
          if (!recipe.thumbnail && recipe.imageLocation) {
            setTimeout(async () => {
              console.log(recipe.name)
              const thumbnail = await saveThumbnail(
                req,
                res,
                recipe.name,
                recipe.imageLocation
              ).catch(console.error)
              customDB.manuallyUpdate(recipe.name, 'thumbnail', thumbnail)

              handled = handled + 1
              if (handled === recipes.length) {
                res.status(200)
                res.redirect('/')
              }
            }, 4000 * (index - handled))
          } else {
            handled = handled + 1
            if (handled === recipes.length) {
              res.status(200)
              res.redirect('/')
            }
          }
        })
      })
      .catch(console.error)
  })

  /**
   * Saves thumbnail to GCS and returns a promise that resolves to the url
   *
   * @param  {Request} req
   * @return {Promise} Resolves to url of saved thumbnail
   */
  const saveThumbnail = async (req, res, recipeName, fullImagePath) => {
    let imagePath = fullImagePath

    // Use the request's image path if none provided
    if (!imagePath && req.file && req.file.path) {
      imagePath = req.file.path
    }

    if (imagePath) {
      //this resizes the image
      const file = await Jimp.read(imagePath)
        .then(async (image) => {
          image.resize(350, Jimp.AUTO)
          return image.getBufferAsync(Jimp.AUTO)
        })
        .catch((err) => {
          console.error(err)
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
      await uploadImage(file, thumbnailImagePath)
        .then((str) => {
          console.log(str)
        })
        .catch((err) => {
          console.error(err)
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
              console.log('Error making image public')
              console.log(err)
            }
            console.log(apiResponse)
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

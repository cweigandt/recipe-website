const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cookieParser())

const corsOptions = {
  origin: [/\.bccookbook.com$/, 'localhost:8080', 'localhost:3001'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'production') {
  // In production, redirect all traffic to https
  app.enable('trust proxy')

  app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
  })
}

const customDB = require('./getters/getDB')
require('./requests')(app)
require('./uploads')(app)
const auth = require('./auth')
auth.listen(app, customDB)

const html = fs
  .readFileSync(path.resolve(__dirname, '../client/build/index.html'))
  .toString()

const getHTMLString = ({ serverData, ogTitle, ogImage, ogDescription }) => {
  return html
    .replace(/%DATA%/, serverData)
    .replace(/%OG_TITLE%/g, ogTitle)
    .replace(/%OG_IMAGE%/, ogImage)
    .replace(/%OG_DESCRIPTION%/, ogDescription)
}

const getServerData = () => {
  return customDB.getAllRecipes()
}

const findRecipe = (allRecipes, recipeName) => {
  return allRecipes.find((r) => r.name === recipeName)
}

app.get('/recipe/:recipeName', (req, res) => {
  var requestedRecipeName = req.params.recipeName.replace(/_/g, ' ')
  var dbPromise = getServerData()
  dbPromise
    .then((allRecipes) => {
      const requestedRecipe = findRecipe(allRecipes, requestedRecipeName)

      const htmlCopy = getHTMLString({
        serverData: JSON.stringify({ allRecipes: allRecipes }),
        ogTitle: requestedRecipe.name,
        ogImage: requestedRecipe.imageLocation,
        ogDescription: 'Create delicious recipes',
      })
      res.send(htmlCopy)
    })
    .catch((err) => {
      res.status(500)
      console.log(err)
    })
})

// Match all routes and exclude all files with extensions (checking for periods)
app.get(/^[^\.]*$/, (req, res) => {
  var dbPromise = getServerData()
  dbPromise
    .then((allRecipes) => {
      const htmlCopy = getHTMLString({
        serverData: JSON.stringify({ allRecipes: allRecipes }),
        ogTitle: 'B+C Cookbook',
        // Use Avocado Toast as default image
        ogImage:
          'https://recipe-website-269020.appspot.com.storage.googleapis.com/public/img/Avocado_Toast.jpeg',
        ogDescription: 'Create delicious recipes',
      })
      res.send(htmlCopy)
    })
    .catch((err) => {
      res.status(500)
      console.log(err)
    })
})

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

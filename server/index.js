const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 8080

const app = express()

const customDB = require('./db')
require('./requests')(app)
require('./uploads')(app)

const html = fs
  .readFileSync(path.resolve(__dirname, '../client/build/index.html'))
  .toString()

const getHTMLString = ({ serverData, ogTitle, ogImage, ogDescription }) => {
  return html
    .replace(/%DATA%/, serverData)
    .replace(/%OG_TITLE%/, ogTitle)
    .replace(/%OG_IMAGE%/, ogImage)
    .replace(/%OG_DESCRIPTION%/, ogDescription)
}

app.get('/recipe/:recipeName', (req, res) => {
  var requestedRecipe = req.params.recipeName.replace(/_/g, ' ')
  var dbPromise = customDB.requestRecipe(requestedRecipe)
  dbPromise
    .then((recipeData) => {
      const htmlCopy = getHTMLString({
        serverData: JSON.stringify(recipeData),
        ogTitle: recipeData.name,
        ogImage: recipeData.imageLocation,
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
  // Use Avocado Toast as default image
  const htmlCopy = getHTMLString({
    serverData: 'null',
    ogTitle: 'B+C Cookbook',
    ogImage:
      'https://recipe-website-269020.appspot.com.storage.googleapis.com/public/img/Avocado_Toast.jpeg',
    ogDescription: 'Create delicious recipes',
  })
  res.send(htmlCopy)
})

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const API_KEYS = JSON.parse(
  fs
    .readFileSync(path.resolve(__dirname, './credentials/api-keys.json'))
    .toString()
)

const spoonacularAPI = `https://api.spoonacular.com/recipes/analyze?apiKey=${API_KEYS.spoonacular}&includeNutrition=false`

exports.spoonacularFetch = (body) => {
  return fetch(spoonacularAPI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.status === 402) {
      return {
        error: 'Nutrition api usage limit reached today',
      }
    } else if (response.status !== 200) {
      response.json().then((data) => console.log(data))
      return {
        error: `Unknown ${response.status} error occurred`,
      }
    } else {
      return response.json()
    }
  })
}

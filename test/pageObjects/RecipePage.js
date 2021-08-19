const { Builder, By, until } = require('selenium-webdriver')
const Page = require('./Page')

module.exports = class RecipePage extends Page {
  visit() {
    return super.visit('http://127.0.0.1:8080/recipe/Salmon_Poke_Bowl')
  }
}

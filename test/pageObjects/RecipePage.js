const { Builder, By, until } = require('selenium-webdriver')
const Page = require('./Page')

const recipe = {
  subIngredients1Name: '',
  time: '',
  thumbnail:
    'https://recipe-website-269020.appspot.com.storage.googleapis.com/public/img/Game_Day_Board_thumbnail.jpeg',
  subIngredients2: [],
  servings: '-',
  ingredients: [
    '2 stalks of celery, cut',
    'Baby carrots',
    'Blue cheese dressing',
    'Purple potatoes',
    'Parsnips (or japanese sweet potatoes)',
    '1lb chicken wings',
    'Old Bay',
    'Honey sriracha sauce (from sauces section)',
    'Canola oil',
  ],
  section: 'Appetizers',
  uploader: 'Brittany Cormier',
  uploadTime: 1620499610411,
  name: 'Game Day Board',
  imageLocation:
    'https://recipe-website-269020.appspot.com.storage.googleapis.com/public/img/Game_Day_Board.jpeg',
  tags: [
    'Chicken Wings',
    'Fries',
    'Carrots',
    'Celery',
    'Blue Cheese Dressing',
    'Parsnips',
    'Sweet Potatoes',
    'Hosting',
  ],
  subIngredients1: [],
  steps: [
    'Preheat oven to 400 F. Peel parsnips. Slice purple potatoes and parsnips into long fries.',
    'Place on baking sheet and toss with olive oil. Season with salt and pepper. Spread fries in an even layer.',
    'Bake for 15 minutes. Flip each fry over and rearrange in an even layer. Bake for 10–15 more minutes, broiling on high for a few minutes at the end when fries are almost done.',
    'For chicken wings, heat canola oil to 350 F. Cover a baking tray with paper towels to catch oil. When oil is hot, add a few chicken wings and cook 4 minutes per side (if the wings are larger, cooking time may be longer) or until 165 F internal temp.  Add chicken wings to baking sheet to cool.',
    'When chicken wings are cool, toss half the batch with old bay seasoning and the other half with honey sriracha sauce.',
  ],
  subIngredients2Name: '',
}

module.exports = class RecipePage extends Page {
  constructor() {
    super()
    this.recipe = recipe
  }

  visit() {
    return super.visit('http://127.0.0.1:8080/recipe/Game_Day_Board')
  }
}

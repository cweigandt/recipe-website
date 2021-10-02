const { Key } = require('selenium-webdriver')
const Page = require('./Page')

const { UPLOAD } = require('../selectors')

module.exports = class UploadPage extends Page {
  constructor() {
    super()
  }

  visit() {
    return super.visit('upload')
  }

  async enterRecipe() {
    await this.findByCSS(UPLOAD.NAME).sendKeys('My Recipe')
    await this.findByCSS(UPLOAD.SECTION)
    await this.findByCSS(UPLOAD.SERVINGS).sendKeys('4')
    await this.findByCSS(UPLOAD.TIME).sendKeys('1h')

    // Not choosing an image
    await this.findByCSS(UPLOAD.IMAGE)

    await this.findByCSS(UPLOAD.INGREDIENTS).sendKeys(
      `Ingredient 1${Key.ENTER}Ingredient 2`
    )

    await this.findByCSS(UPLOAD.SUB_INGREDIENTS_1_NAME).sendKeys('Sub1')
    await this.findByCSS(UPLOAD.SUB_INGREDIENTS_1).sendKeys(
      `Sub 1 Ingredient 1${Key.ENTER}Sub 1 Ingredient 2`
    )

    await this.findByCSS(UPLOAD.SUB_INGREDIENTS_2_NAME).sendKeys('Sub2')
    await this.findByCSS(UPLOAD.SUB_INGREDIENTS_2).sendKeys(
      `Sub 2 Ingredient 1${Key.ENTER}Sub 2 Ingredient 2`
    )

    await this.findByCSS(UPLOAD.STEPS).sendKeys(`Step 1${Key.ENTER}Step 2`)

    await this.findByCSS(UPLOAD.TAGS)
    return this.findByCSS(UPLOAD.UPLOADER).sendKeys('Big Dog')
  }
}

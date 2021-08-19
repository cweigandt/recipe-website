const webdriver = require('selenium-webdriver')
const assert = require('assert')

const RecipePage = require('./pageObjects/RecipePage')

const By = webdriver.By
const until = webdriver.until

describe('Recipe', function () {
  this.timeout(10000)
  let page

  before(() => {
    page = new RecipePage()
    return page.visit()
  })

  it('hides logged in affordances', async () => {
    return page.driver
      .findElements(By.css(`[data-test-id='edit-button']`))
      .then((elements) => {
        assert.strictEqual(elements.length, 0)
      })
  })

  after(() => page.quit())
})

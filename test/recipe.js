const webdriver = require('selenium-webdriver')
const expect = require('expect')

const RecipePage = require('./pageObjects/RecipePage')

const By = webdriver.By
const until = webdriver.until

describe('Recipe', function () {
  this.timeout(10000)
  let page

  before(async () => {
    page = new RecipePage()
    return page.visit()
  })

  describe('Content', () => {
    it('has proper title', async () => {
      return page.driver
        .findElement(By.id('recipeTitle'))
        .getText()
        .then((text) => {
          expect(text).toBe(page.recipe.name)
        })
    })

    it('has proper section', async () => {
      return page.driver
        .findElement(By.id('sectionName'))
        .getText()
        .then((text) => {
          expect(text).toBe(page.recipe.section.toLowerCase())
        })
    })

    it('has proper servings', async () => {
      return page.driver
        .findElement(By.id('servingsNumber'))
        .getText()
        .then((text) => {
          expect(text).toBe(page.recipe.servings)
        })
    })

    it('uses HD image', async () => {
      return page.driver
        .findElement(By.id('recipeImage'))
        .getAttribute('src')
        .then((imgSrc) => {
          expect(imgSrc).toBe(page.recipe.imageLocation)
        })
    })
  })

  describe('Logged in', () => {
    it('hides logged in affordances', async () => {
      await page.driver
        .findElements(By.css(`[data-test-id='edit-button']`))
        .then((elements) => {
          expect(elements.length).toBe(0)
        })

      return page.driver.findElements(By.css(`#iMadeThis`)).then((elements) => {
        expect(elements.length).toBe(0)
      })
    })

    it('logs in properly', async () => {
      // set fake token cookie and reload
      await page.driver
        .manage()
        .addCookie({ name: 'token', value: 'test-token' })
      await page.driver.navigate().refresh()

      await page.findByCSS(`[data-test-id='edit-button']`)

      return page.driver.findElements(By.css(`#iMadeThis`)).then((elements) => {
        expect(elements.length).toBe(1)
      })
    })
  })

  after(() => page.quit())
})

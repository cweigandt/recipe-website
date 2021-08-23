const webdriver = require('selenium-webdriver')
const expect = require('expect')

const RecipePage = require('./pageObjects/RecipePage')

const By = webdriver.By
const until = webdriver.until

describe('Recipe', function () {
  this.timeout(20000)
  let page

  before(async () => {
    page = new RecipePage()
    await page.visit()

    // Fonts are blocking so wait 3 full seconds
    return page.sleep(3000)
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

  describe('Meta', () => {
    it('has proper title tag', async () => {
      // TODO: hook this up to be the recipe
      return page.driver.getTitle().then((title) => {
        expect(title).toBe('B+C Cookbook')
      })
    })

    it('has OG tags', async () => {
      await page
        .findByCSS(`meta[property='og:title']`)
        .getAttribute('content')
        .then((text) => {
          expect(text).toBe(page.recipe.name)
        })
      await page
        .findByCSS(`meta[property='og:image']`)
        .getAttribute('content')
        .then((text) => {
          expect(text).toBe(page.recipe.imageLocation)
        })
      await page
        .findByCSS(`meta[property='og:description']`)
        .getAttribute('content')
        .then((text) => {
          expect(text).not.toBeNull()
        })
    })
  })

  describe('Logged in', () => {
    it('hides logged in affordances', async () => {
      await page
        .getElementCount(`[data-test-id='edit-button']`)
        .then((count) => {
          expect(count).toBe(0)
        })

      return page.getElementCount(`#iMadeThis`).then((count) => {
        expect(count).toBe(0)
      })
    })

    it('logs in properly', async () => {
      await page.fakeLogin()

      await page.findByCSS(`[data-test-id='edit-button']`)

      return page.getElementCount(`#iMadeThis`).then((count) => {
        expect(count).toBe(1)
      })
    })
  })

  after(() => page.quit())
})

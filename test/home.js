const { By, Key } = require('selenium-webdriver')
const Page = require('./pageObjects/Page')
const expect = require('expect')

describe('Home', function () {
  this.timeout(20000)
  let page

  before((done) => {
    page = new Page()
    done()
  })

  describe('Search', () => {
    it('loads with search', async () => {
      await page.visit()
      return page.findByCSS(`input[data-test-id='search-bar']`)
    })

    it('has the full set of recipes', async () => {
      await page
        .findByCSS(`div[data-test-id='recipe-counter']`)
        .getText()
        .then((text) => {
          expect(text).toBe('3')
        })
    })

    it('searches for recipes', async () => {
      await page
        .findByCSS(`input[data-test-id='search-bar']`)
        .then((el) => el.sendKeys('am'))

      await page
        .findByCSS(`div[data-test-id='recipe-counter']`)
        .getText()
        .then((text) => {
          expect(text).toBe('2')
        })
    })

    it('continues search', async () => {
      await page
        .findByCSS(`input[data-test-id='search-bar']`)
        .then((el) => el.sendKeys('e'))

      await page
        .findByCSS(`div[data-test-id='recipe-counter']`)
        .getText()
        .then((text) => {
          expect(text).toBe('1')
        })
    })

    it('updates on search clear', async () => {
      await page
        .findByCSS(`input[data-test-id='search-bar']`)
        .sendKeys(Key.BACK_SPACE + Key.BACK_SPACE + Key.BACK_SPACE)

      await page
        .findByCSS(`div[data-test-id='recipe-counter']`)
        .getText()
        .then((text) => {
          expect(text).toBe('3')
        })
    })
  })

  describe('Deck', () => {
    it('has all recipes displayed', async () => {
      return page.getElementCount(`a.recipe-card`).then((count) => {
        expect(count).toBe(3)
      })
    })
  })

  after(() => page.driver.quit())
})

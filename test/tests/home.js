const { By, Key } = require('selenium-webdriver')
const Page = require('../pageObjects/Page')
const expect = require('expect')
const { HOME } = require('../selectors')

describe('Home', function () {
  this.timeout(20000)
  let page

  before((done) => {
    page = new Page()
    done()
  })

  describe('Deck', () => {
    it('has all recipes displayed', async () => {
      await page.visit()
      return page.getElementCount(HOME.RECIPE_CARD).then((count) => {
        expect(count).toBe(3)
      })
    })
  })

  describe('Search', () => {
    it('has the full set of recipes', async () => {
      await page
        .findByCSS(HOME.COUNTER)
        .getText()
        .then((text) => {
          expect(text).toBe('3')
        })
    })

    it('searches for recipes', async () => {
      await page.findByCSS(HOME.SEARCH_BAR).then((el) => el.sendKeys('am'))

      await page
        .findByCSS(HOME.COUNTER)
        .getText()
        .then((text) => {
          expect(text).toBe('2')
        })
    })

    it('continues search', async () => {
      await page.findByCSS(HOME.SEARCH_BAR).then((el) => el.sendKeys('e'))

      await page
        .findByCSS(HOME.COUNTER)
        .getText()
        .then((text) => {
          expect(text).toBe('1')
        })
    })

    it('updates on search clear', async () => {
      await page
        .findByCSS(HOME.SEARCH_BAR)
        .sendKeys(Key.BACK_SPACE + Key.BACK_SPACE + Key.BACK_SPACE)

      await page
        .findByCSS(HOME.COUNTER)
        .getText()
        .then((text) => {
          expect(text).toBe('3')
        })
    })

    it('searches for tags', async () => {
      await page
        .findByCSS(HOME.SEARCH_BAR)
        .then((el) => el.sendKeys('Margarita'))

      await page
        .findByCSS(HOME.COUNTER)
        .getText()
        .then((text) => {
          expect(text).toBe('1')
        })
    })
  })

  after(() => page.driver.quit())
})

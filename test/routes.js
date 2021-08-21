const webdriver = require('selenium-webdriver')
const Page = require('./pageObjects/Page')

const By = webdriver.By
const until = webdriver.until

describe('Routes', function () {
  this.timeout(10000)
  let page

  before((done) => {
    page = new Page()
    done()
  })

  it('loads /', async () => {
    await page.visit()
    return page.findByCSS('.App #pageWrapper')
  })

  it('loads /grid', async () => {
    await page.visit('grid')
    return page.findByCSS('#recipeGrid')
  })

  it('loads /recipe', async () => {
    await page.visit(`recipe/Game_Day_Board`)
    return page.findByCSS('#recipeWrapper')
  })

  it('loads /sections', async () => {
    await page.visit(`sections/Appetizers`)
    return page.findByCSS('.App #pageWrapper')
  })

  it('loads /tag', async () => {
    await page.visit(`tag/Christian's_Favorites`)
    return page.findByCSS('.App #pageWrapper')
  })

  it('loads /edit', async () => {
    await page.visit(`edit`)
    return page.findByCSS('#formWrapper')
  })

  it('loads /upload', async () => {
    await page.visit(`upload`)
    return page.findByCSS('#formWrapper')
  })

  after(() => page.driver.quit())
})

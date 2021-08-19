const webdriver = require('selenium-webdriver')
const Page = require('./pageObjects/Page')

const By = webdriver.By
const until = webdriver.until

const pageRoot = 'http://127.0.0.1:8080'

describe('Routes', function () {
  this.timeout(10000)
  let page

  before((done) => {
    page = new Page()
    done()
  })

  it('loads index', async () => {
    await page.visit(pageRoot)
    return page.findByCSS('.App #pageWrapper')
  })

  it('loads grid', async () => {
    await page.driver.get(`${pageRoot}/grid`)
    return page.findByCSS('#recipeGrid')
  })

  it('loads recipe', async () => {
    await page.driver.get(`${pageRoot}/recipe/Game_Day_Board`)
    return page.findByCSS('#recipeWrapper')
  })

  it('loads section', async () => {
    await page.driver.get(`${pageRoot}/sections/Appetizers`)
    return page.findByCSS('.App #pageWrapper')
  })

  it('loads tag', async () => {
    await page.driver.get(`${pageRoot}/tag/Christian's_Favorites`)
    return page.findByCSS('.App #pageWrapper')
  })

  it('loads edit', async () => {
    await page.driver.get(`${pageRoot}/edit`)
    return page.findByCSS('#formWrapper')
  })

  it('loads upload', async () => {
    await page.driver.get(`${pageRoot}/upload`)
    return page.findByCSS('#formWrapper')
  })

  after(() => page.driver.quit())
})

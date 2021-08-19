const webdriver = require('selenium-webdriver')

const By = webdriver.By
const until = webdriver.until
const driver = new webdriver.Builder().forBrowser('chrome').build()

const pageRoot = 'http://127.0.0.1:8080'

describe('Routes', function () {
  this.timeout(10000)

  it('loads index', async () => {
    await driver.navigate().to(pageRoot)
    return driver.wait(until.elementLocated(By.css('.App #pageWrapper')))
  })

  it('loads grid', async () => {
    await driver.navigate().to(`${pageRoot}/grid`)
    return driver.wait(until.elementLocated(By.css('#recipeGrid')))
  })

  it('loads recipe', async () => {
    await driver.navigate().to(`${pageRoot}/recipe/Game_Day_Board`)
    return driver.wait(until.elementLocated(By.css('#recipeWrapper')))
  })

  it('loads section', async () => {
    await driver.navigate().to(`${pageRoot}/sections/Appetizers`)
    return driver.wait(until.elementLocated(By.css('.App #pageWrapper')))
  })

  it('loads tag', async () => {
    await driver.navigate().to(`${pageRoot}/tag/Christian's_Favorites`)
    return driver.wait(until.elementLocated(By.css('.App #pageWrapper')))
  })

  it('loads edit', async () => {
    await driver.navigate().to(`${pageRoot}/edit`)
    return driver.wait(until.elementLocated(By.css('#formWrapper')))
  })

  it('loads upload', async () => {
    await driver.navigate().to(`${pageRoot}/upload`)
    return driver.wait(until.elementLocated(By.css('#formWrapper')))
  })

  after(() => driver.quit())
})

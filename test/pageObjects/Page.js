const { Builder, By, Capabilities, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

console.log('Making chromedriver')
console.log(process.env.CHROMEWEBDRIVER)
chrome.setDefaultService(
  new chrome.ServiceBuilder(process.env.CHROMEWEBDRIVER).build()
)

const pageRoot = 'http://127.0.0.1:8080'

module.exports = class Page {
  constructor() {
    const capabilities = Capabilities.chrome()
    capabilities.set('chromeOptions', {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-using',
        '--window-size=1980,1200',
      ],
    })

    this.driver = new Builder().withCapabilities(capabilities).build()
  }

  visit(ext) {
    return this.driver.get(`${pageRoot}/${ext || ''}`)
  }

  sleep(ms) {
    return this.driver.sleep(ms)
  }

  quit() {
    return this.driver.quit()
  }

  async fakeLogin() {
    // set fake token cookie and reload
    await this.driver.manage().addCookie({ name: 'token', value: 'test-token' })
    return this.driver.navigate().refresh()
  }

  findByCSS(css) {
    this.driver.wait(
      until.elementLocated(By.css(css)),
      15000,
      'Looking for element'
    )
    return this.driver.findElement(By.css(css))
  }
}

const { Builder, By, Capabilities, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

console.log('Making chromedriver')
console.log(process.env.CHROMEWEBDRIVER)
chrome.setDefaultService(
  new chrome.ServiceBuilder(process.env.CHROMEWEBDRIVER).build()
)

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

  visit(theUrl) {
    return this.driver.get(theUrl)
  }

  sleep(ms) {
    return this.driver.sleep(ms)
  }

  quit() {
    return this.driver.quit()
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

const { Builder, By, Capabilities, until } = require('selenium-webdriver')
require('chromedriver')

module.exports = class Page {
  constructor() {
    const capabilities = Capabilities.chrome()
    capabilities.set('chromeOptions', {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
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

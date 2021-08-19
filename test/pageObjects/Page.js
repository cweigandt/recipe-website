const { Builder, By, until } = require('selenium-webdriver')

module.exports = class Page {
  constructor() {
    this.driver = new Builder().forBrowser('chrome').build()
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

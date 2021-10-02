const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const pageRoot = 'http://127.0.0.1:8080'

module.exports = class Page {
  constructor() {
    const capabilities = Capabilities.chrome()
    capabilities.set('chromeOptions', {
      args: [
        '--no-sandbox',
        '--headless',
        '--disable-dev-shm-usage',
        '--window-size=1980,1200',
      ],
    })

    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chrome.Options.fromCapabilities(capabilities))
      .build()

    this.driver.manage().deleteAllCookies()
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
    return this.driver.wait(
      until.elementLocated(By.css(css)),
      3000,
      `Looking for element matching '${css}'`
    )
  }

  getElementCount(css) {
    return this.driver
      .findElements(By.css(css))
      .then((elements) => elements.length)
  }

  async clearInput(css) {
    const input = this.findByCSS(css)
    const text = await input.getAttribute('value')
    for (let count = 0; count < text.length; count++) {
      await input.sendKeys(Key.BACK_SPACE)
    }
  }
}

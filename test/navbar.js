const { By } = require('selenium-webdriver')
const Page = require('./pageObjects/Page')
const expect = require('expect')

const { NoSuchCookieError } = require('selenium-webdriver/lib/error')

describe('NavBar', function () {
  this.timeout(10000)
  let page

  before((done) => {
    page = new Page()
    done()
  })

  describe('Login', () => {
    it('opens sign in modal', async () => {
      await page.visit()
      await page.findByCSS(`div[data-test-id='login-button']`).click()

      return page.findByCSS(`div.sign-in-modal`)
    })

    it('accepts username and password and removes modal', async () => {
      await page
        .findByCSS(`input[data-test-id='login-username']`)
        .sendKeys('my_user')
      await page
        .findByCSS(`input[data-test-id='login-password']`)
        .sendKeys('my_pass')

      await page.findByCSS(`button[data-test-id='login-submit']`).click()

      // give time for round trip api call
      await page.sleep(500)

      return page.getElementCount(`div.sign-in-modal`).then((count) => {
        expect(count).toBe(0)
      })
    })

    it('applies cookie on login success', async () => {
      await page.driver
        .manage()
        .getCookie('token')
        .then((cookie) => {
          expect(cookie.value).not.toBeNull()
        })
    })

    it('hides login button when logged in', async () => {
      page.getElementCount(`div[data-test-id='login-button']`).then((count) => {
        expect(count).toBe(0)
      })

      return page.findByCSS(`div.navbar-logged-in`)
    })
  })

  describe('Logout', () => {
    it('clicks logout button', async () => {
      await page.findByCSS(`div[data-test-id='logout-button']`).click()

      return page.findByCSS(`div.are-you-sure-modal`)
    })

    it('confirms modal and logs out', async () => {
      await page.findByCSS(`button[data-test-id='are-you-sure-submit']`).click()

      // give time for round trip api call
      await page.sleep(500)

      return page.findByCSS(`div[data-test-id='login-button']`)
    })

    it('remains logged out on page refresh', async () => {
      await page.driver.navigate().refresh()
      return page.findByCSS(`div[data-test-id='login-button']`)
    })

    it('has cleared cookie when logged out', async () => {
      await page.driver
        .manage()
        .getCookie('token')
        .then((cookie) => {
          expect(1).toBe(2)
        })
        .catch((err) => {
          expect(err instanceof NoSuchCookieError).toBe(true)
        })
    })
  })

  after(() => page.driver.quit())
})

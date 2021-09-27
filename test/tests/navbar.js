const Page = require('../pageObjects/Page')
const expect = require('expect')
const { HOME, NAVBAR } = require('../selectors')

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
      await page.findByCSS(NAVBAR.LOGIN_BUTTON).click()

      return page.findByCSS(NAVBAR.SIGN_IN_MODAL)
    })

    it('accepts username and password and removes modal', async () => {
      await page.findByCSS(NAVBAR.SIGN_IN_USERNAME).sendKeys('my_user')
      await page.findByCSS(NAVBAR.SIGN_IN_PASSWORD).sendKeys('my_pass')

      await page.findByCSS(NAVBAR.SIGN_IN_SUBMIT).click()

      // give time for round trip api call
      await page.sleep(500)

      return page.getElementCount(NAVBAR.SIGN_IN_MODAL).then((count) => {
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
      page.getElementCount(NAVBAR.LOGIN_BUTTON).then((count) => {
        expect(count).toBe(0)
      })

      return page.findByCSS(NAVBAR.LOG_OUT_BUTTON)
    })
  })

  describe('Logout', () => {
    it('clicks logout button', async () => {
      await page.findByCSS(NAVBAR.LOG_OUT_BUTTON).click()

      return page.findByCSS(NAVBAR.ARE_YOU_SURE_MODAL)
    })

    it('confirms modal and logs out', async () => {
      await page.findByCSS(NAVBAR.ARE_YOU_SURE_SUBMIT).click()

      // give time for round trip api call
      await page.sleep(500)

      return page.findByCSS(NAVBAR.LOGIN_BUTTON)
    })

    it('remains logged out on page refresh', async () => {
      await page.driver.navigate().refresh()
      return page.findByCSS(NAVBAR.LOGIN_BUTTON)
    })

    it('has cleared cookie when logged out', async () => {
      await page.driver
        .manage()
        .getCookie('token')
        .then((cookie) => {
          expect(1).toBe(2)
        })
        .catch((err) => {
          expect(err).not.toBeNull()
        })
    })
  })

  describe('Menu', () => {
    it('opens navbar menu', async () => {
      await page.findByCSS(NAVBAR.MENU_TOGGLE).click()
      return page.findByCSS(NAVBAR.MENU)
    })

    describe('Dark Mode', () => {
      it('has dark mode by default', async () => {
        await page.findByCSS(HOME.DARK_BODY)

        return page.findByCSS(NAVBAR.DARK_MODE_DARK_ON)
      })

      it('switches to light mode', async () => {
        await page.findByCSS(NAVBAR.DARK_MODE_LIGHT).click()
        await page.findByCSS(HOME.LIGHT_BODY)

        return page.findByCSS(NAVBAR.DARK_MODE_LIGHT_ON)
      })

      it('switches back to dark mode when clicking slant', async () => {
        await page.findByCSS(NAVBAR.DARK_MODE_SLANT).click()
        await page.findByCSS(HOME.DARK_BODY)

        await page.findByCSS(NAVBAR.DARK_MODE_SLANT_ON)
        return page.findByCSS(NAVBAR.DARK_MODE_DARK_ON)
      })
    })
  })

  after(() => page.driver.quit())
})

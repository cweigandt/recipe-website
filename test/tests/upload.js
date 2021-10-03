const Page = require('../pageObjects/UploadPage')

const { NAVBAR, UPLOAD } = require('../selectors')

describe('Upload', function () {
  this.timeout(10000)
  let page

  before((done) => {
    page = new Page()
    page.visit()

    done()
  })

  it('show modal when not logged in', async () => {
    return page.findByCSS(NAVBAR.SIGN_IN_MODAL)
  })

  it('has all inputs', async () => {
    page.fakeLogin()

    await page.findByCSS(UPLOAD.NAME)
    await page.findByCSS(UPLOAD.SECTION)
    await page.findByCSS(UPLOAD.SERVINGS)
    await page.findByCSS(UPLOAD.TIME)
    await page.findByCSS(UPLOAD.IMAGE)
    await page.findByCSS(UPLOAD.INGREDIENTS)
    await page.findByCSS(UPLOAD.SUB_INGREDIENTS_1_NAME)
    await page.findByCSS(UPLOAD.SUB_INGREDIENTS_1)
    await page.findByCSS(UPLOAD.SUB_INGREDIENTS_2_NAME)
    await page.findByCSS(UPLOAD.SUB_INGREDIENTS_2)
    await page.findByCSS(UPLOAD.STEPS)
    await page.findByCSS(UPLOAD.TAGS)
    await page.findByCSS(UPLOAD.UPLOADER)

    return page.findByCSS(UPLOAD.SUBMIT)
  })

  it('submits properly', async () => {
    await page.enterRecipe()
    await page.findByCSS(UPLOAD.SUBMIT).submit()

    return page.findSuccessAlert()
  })

  it('adds submitted recipe to db as expected', async () => {
    return page.visit('recipe/My_Recipe')
  })

  after(() => page.driver.quit())
})

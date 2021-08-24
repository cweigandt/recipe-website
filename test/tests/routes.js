const Page = require('../pageObjects/Page')

const { WRAPPERS } = require('../selectors')

describe('Routes', function () {
  this.timeout(10000)
  let page

  before((done) => {
    page = new Page()
    done()
  })

  it('loads /', async () => {
    await page.visit()
    return page.findByCSS(WRAPPERS.PAGE_WRAPPER)
  })

  it('loads /grid', async () => {
    await page.visit('grid')
    return page.findByCSS(WRAPPERS.GRID_WRAPPER)
  })

  it('loads /recipe', async () => {
    await page.visit(`recipe/Game_Day_Board`)
    return page.findByCSS(WRAPPERS.RECIPE_WRAPPER)
  })

  it('loads /sections', async () => {
    await page.visit(`sections/Appetizers`)
    return page.findByCSS(WRAPPERS.PAGE_WRAPPER)
  })

  it('loads /tag', async () => {
    await page.visit(`tag/Christian's_Favorites`)
    return page.findByCSS(WRAPPERS.PAGE_WRAPPER)
  })

  it('loads /edit', async () => {
    await page.visit(`edit`)
    return page.findByCSS(WRAPPERS.FORM_WRAPPER)
  })

  it('loads /upload', async () => {
    await page.visit(`upload`)
    return page.findByCSS(WRAPPERS.FORM_WRAPPER)
  })

  after(() => page.driver.quit())
})

import { shallow } from 'enzyme'
import RecipeCookedDates from '../RecipeCookedDates'

describe('RecipeCookedDates', () => {
  it('returns null when no dates exist', () => {
    const rendered = shallow(<RecipeCookedDates dates={[]} />)
    expect(rendered.isEmptyRender()).toBe(true)
  })

  it('returns null when dates is undefined', () => {
    const rendered = shallow(<RecipeCookedDates />)
    expect(rendered.isEmptyRender()).toBe(true)
  })

  it('returns formatted string of only date', () => {
    const dd = new Date('January 15, 2020')

    const rendered = shallow(<RecipeCookedDates dates={[dd.getTime()]} />)
    expect(rendered.text()).toBe(`Last made January 2020 (1 time)`)
  })

  it('returns formatted string of first element of many dates', () => {
    const dd = new Date('January 15, 2020')
    const dd2 = new Date('March 31, 2021')

    const rendered = shallow(
      <RecipeCookedDates dates={[dd.getTime(), dd2.getTime()]} />
    )
    expect(rendered.text()).toBe(`Last made January 2020 (2 times)`)
  })
})

import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router'

import DeckBanner from '../DeckBanner'

const searchTextSpy = jest.fn()

const defaultProps = {
  name: 'My Recipe',
  imageLocation: '',
  onSearchText: searchTextSpy,
}

describe('DeckBanner', () => {
  beforeEach(() => {
    const noop = () => {}
    Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
  })

  it('fires event on search', () => {
    const rendered = mount(
      <Router>
        <DeckBanner {...defaultProps} />
      </Router>
    )

    rendered
      .find('input')
      .simulate('input', { target: { value: 'Search text' } })

    expect(searchTextSpy).toHaveBeenCalled()
    expect(searchTextSpy).toBeCalledWith('Search text')
  })

  it('adds appropriate searching class', () => {
    const rendered = mount(
      <Router>
        <DeckBanner {...defaultProps} />
      </Router>
    )

    expect(rendered.find('#bannerWrapper').hasClass('searching')).toBe(false)

    rendered
      .find('input')
      .simulate('input', { target: { value: 'Search text' } })

    expect(rendered.find('#bannerWrapper').hasClass('searching')).toBe(true)
  })
})

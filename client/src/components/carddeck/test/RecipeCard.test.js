import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import CardBookmark, { BOOKMARK_TYPES } from '../../widgets/CardBookmark'
import RecipeCard from '../RecipeCard'

const defaultProps = {
  name: 'My Recipe',
  section: 'Desserts',
  tags: [],
  thumbnail: '',
  imageLocation: '',
  uploadTime: new Date().getTime(),
}

describe('RecipeCard', () => {
  describe('Bookmarks', () => {
    it(`renders NEW bookmark`, () => {
      const rendered = mount(
        <Router>
          <RecipeCard {...defaultProps} />
        </Router>
      )
      expect(rendered.find(CardBookmark).props().type).toBe(BOOKMARK_TYPES.NEW)
    })

    it(`renders NEW bookmark even if it's a favorite`, () => {
      const props = { ...defaultProps, tags: [`Christian's Favorites`] }
      const rendered = mount(
        <Router>
          <RecipeCard {...props} />
        </Router>
      )
      expect(rendered.find(CardBookmark).props().type).toBe(BOOKMARK_TYPES.NEW)
      expect(rendered.find(CardBookmark)).toHaveLength(1)
    })

    it(`renders STAR bookmark`, () => {
      const props = {
        ...defaultProps,
        tags: [`Christian's Favorites`],
        uploadTime: new Date('March 31, 2000').getTime(),
      }

      const rendered = mount(
        <Router>
          <RecipeCard {...props} />
        </Router>
      )
      expect(rendered.find(CardBookmark).props().type).toBe(BOOKMARK_TYPES.STAR)
    })

    it(`renders 2 STAR bookmarks`, () => {
      const props = {
        ...defaultProps,
        tags: [`Brittany's Favorites`, `Christian's Favorites`],
        uploadTime: new Date('March 31, 2000').getTime(),
      }

      const rendered = mount(
        <Router>
          <RecipeCard {...props} />
        </Router>
      )
      expect(rendered.find(CardBookmark).props().type).toBe(BOOKMARK_TYPES.STAR)
      // 2 children since the first is the bookmark div
      expect(rendered.find(CardBookmark).children().children()).toHaveLength(2)
    })
  })
})

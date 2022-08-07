/* eslint-disable testing-library/render-result-naming-convention */
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import RecipeCard from '../RecipeCard'
import { RecipeCardDeck } from '../RecipeCardDeck'

const rightNow = new Date().getTime()
const mockRecipes = [
  {
    name: 'First',
    imageLocation: '',
    thumbnail: '',
    tags: [],
    visits: 1,
    cookedDates: [],
    steps: [],
    ingredients: [],
    section: 'Drinks',
    time: '1h',
    uploader: 'me',
    uploadTime: rightNow,
  },
  {
    name: 'Second',
    imageLocation: '',
    thumbnail: '',
    tags: [],
    visits: 3,
    cookedDates: [],
    steps: [],
    ingredients: [],
    section: 'Entrees',
    time: '1h 30m',
    uploader: 'you',
    uploadTime: rightNow - 10,
  },
]

const DEFAULT_PROPS = {
  recipes: mockRecipes,
  location: { search: '' },
  history: {},
}

const renderDeck = () => {
  return mount(
    <Router>
      <RecipeCardDeck {...DEFAULT_PROPS} />
    </Router>
  )
}
describe('RecipeCardDeck', () => {
  it('renders without error', () => {
    const rendered = renderDeck()
    expect(rendered).not.toBeNull()
  })

  it('renders all recipes', () => {
    const rendered = renderDeck()
    expect(rendered.find(RecipeCard)).toHaveLength(mockRecipes.length)
  })

  describe('Sort Bar', () => {
    it('Sorts by upload by default', () => {
      const rendered = renderDeck()
      const cards = rendered.find(RecipeCard)
      expect(cards).toHaveLength(mockRecipes.length)
      rendered.update()

      expect(cards.at(0).props().name).toBe('First')
      expect(cards.at(1).props().name).toBe('Second')
    })

    it('Sorts by visits on click', () => {
      const rendered = renderDeck()

      act(() => {
        rendered.find(`[data-test-id='sort-bubble-Visits']`).simulate('click')
      })

      rendered.update()
      const cards = rendered.find(RecipeCard)
      expect(cards).toHaveLength(mockRecipes.length)
      expect(cards.at(0).props().name).toBe('Second')
      expect(cards.at(1).props().name).toBe('First')
    })
  })
})

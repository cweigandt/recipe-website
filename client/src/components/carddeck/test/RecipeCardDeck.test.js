import { mount, shallow } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import RecipeCard from '../RecipeCard'
import RecipeCardDeck from '../RecipeCardDeck'

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

describe('RecipeCardDeck', () => {
  it('renders without error', () => {
    const rendered = shallow(<RecipeCardDeck optionalRecipes={mockRecipes} />)
    expect(rendered).not.toBeNull()
  })

  it('renders all recipes', () => {
    const rendered = mount(
      <Router>
        <RecipeCardDeck optionalRecipes={mockRecipes} />
      </Router>
    )
    expect(rendered.find(RecipeCard)).toHaveLength(mockRecipes.length)
  })

  describe('Sort Bar', () => {
    it('Sorts by upload by default', () => {
      const rendered = mount(
        <Router>
          <RecipeCardDeck optionalRecipes={mockRecipes} />
        </Router>
      )

      const cards = rendered.find(RecipeCard)
      expect(cards).toHaveLength(mockRecipes.length)

      expect(cards.at(0).props().name).toBe('First')
      expect(cards.at(1).props().name).toBe('Second')
    })

    it('Sorts by visits on click', () => {
      const rendered = mount(
        <Router>
          <RecipeCardDeck optionalRecipes={mockRecipes} />
        </Router>
      )

      rendered.find(`[data-test-id='sort-bubble-Visits']`).simulate('click')
      const cards = rendered.find(RecipeCard)
      expect(cards).toHaveLength(mockRecipes.length)

      expect(cards.at(0).props().name).toBe('Second')
      expect(cards.at(1).props().name).toBe('First')
    })
  })
})

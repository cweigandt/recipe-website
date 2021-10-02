import { mount, shallow } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import RecipeCard from '../RecipeCard'
import RecipeCardDeck from '../RecipeCardDeck'

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
    uploadTime: new Date().getTime(),
  },
]
const mockWindow = () => {
  const windowSpy = jest.spyOn(global, 'window', 'get')
  windowSpy.mockImplementation(() => ({
    ...window,
    serverData: {
      allRecipes: mockRecipes,
    },
  }))
}
describe('RecipeCardDeck', () => {
  beforeEach(() => {})

  it('renders without error', () => {
    // mockWindow()

    const rendered = shallow(<RecipeCardDeck optionalRecipes={mockRecipes} />)
    expect(rendered).not.toBeNull()
  })

  it('renders all recipes', () => {
    const rendered = mount(
      <Router>
        <RecipeCardDeck optionalRecipes={mockRecipes} />
      </Router>
    )
    console.log(rendered.debug())
    expect(rendered.find(RecipeCard)).toHaveLength(mockRecipes.length)
  })
})

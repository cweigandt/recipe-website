import { shallow } from 'enzyme'
import { Route } from 'react-router-dom'
import App from './App'
import NavBar from './components/navbar/NavBar'

const routePaths = [
  '/recipe/:recipeName',
  '/grid',
  '/reports',
  '/tags',
  '/upload',
  '/edit',
  '/sections/:sectionName',
  '/tag/:tagName',
  '/',
]
describe('App', () => {
  it('renders App', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.App')).toHaveLength(1)
  })

  it('renders NavBar', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(NavBar)).toHaveLength(1)
  })

  it('renders routes', () => {
    const wrapper = shallow(<App />)
    const routes = wrapper.find(Route)
    expect(routes).toHaveLength(10)

    routes.forEach((route) => {
      const routeProps = route.props()
      expect(
        !routeProps.path || routePaths.includes(routeProps.path)
      ).toBeTruthy()
    })
  })
})

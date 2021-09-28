import { shallow } from 'enzyme'
import App from './App'

describe('A[[', () => {
  it('renders App', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.App')).toHaveLength(1)
  })
})

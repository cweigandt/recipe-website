import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '../reducers'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

export const renderWithStore = (component, state = {}) => {
  const user = userEvent.setup()

  const mockStore = configureStore({
    reducer,
    preloadedState: state,
  })

  const Wrapper = ({ children }) => {
    return (
      <MemoryRouter>
        <Provider store={mockStore}>{children}</Provider>
      </MemoryRouter>
    )
  }

  return { user, ...render(component, { wrapper: Wrapper }) }
}

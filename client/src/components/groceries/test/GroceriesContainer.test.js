/* eslint-disable testing-library/no-node-access */
import { screen } from '@testing-library/react'
import GroceriesContainer from '../GroceriesContainer'
import { renderWithStore } from '../../../test-utils'

describe('GroceriesContainer', () => {
  it('renders empty container', () => {
    const { unmount } = renderWithStore(<GroceriesContainer />, {
      groceries: {
        isShopping: true,
        cart: {},
      },
    })

    screen.getByText('Add items to your cart to get started!')
    unmount()
  })

  it('removes recipes', async () => {
    const { user, unmount } = renderWithStore(<GroceriesContainer />, {
      groceries: {
        isShopping: true,
        cart: {
          'Recipe Name': {
            recipe: {
              name: 'Recipe Name',
              ingredients: [],
              subIngredients1: [],
              tags: [],
            },
            ingredientTypes: ['ingredients', 'subIngredients1'],
          },
        },
      },
    })

    expect(screen.getByTestId('card-deck').children).toHaveLength(1)
    await user.click(screen.getByTestId('grocery-recipe-remove'))
    screen.getByText('Add items to your cart to get started!')
    unmount()
  })
})

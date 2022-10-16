import { screen } from '@testing-library/react'
import AddToCart from '../AddToCart'
import { renderWithStore } from '../../../test-utils'

const RECIPE = {
  name: 'Recipe Name',
  ingredients: ['1tsp salt'],
}

describe('AddToCart', () => {
  it('renders empty when not shopping', () => {
    const { container, unmount } = renderWithStore(<AddToCart />, {
      groceries: {
        isShopping: false,
        cart: {},
      },
    })

    expect(container).toBeEmptyDOMElement()
    unmount()
  })

  it('renders button when shopping', () => {
    const { unmount } = renderWithStore(<AddToCart recipe={RECIPE} />, {
      groceries: {
        isShopping: true,
        cart: {},
      },
    })

    screen.getByTestId('addToCart')
    unmount()
  })

  it('renders remove button when in cart', () => {
    const { unmount } = renderWithStore(<AddToCart recipe={RECIPE} />, {
      groceries: {
        isShopping: true,
        cart: {
          'Recipe Name': {
            recipe: RECIPE,
            ingredientTypes: ['ingredients'],
          },
        },
      },
    })

    screen.getByText('In Cart')
    unmount()
  })

  it('updates button on add to cart', async () => {
    const { user, unmount } = renderWithStore(<AddToCart recipe={RECIPE} />, {
      groceries: {
        isShopping: true,
        cart: {},
      },
    })

    await user.click(screen.getByTestId('addToCart'))
    screen.getByText('In Cart')

    unmount()
  })

  it('updates button on remove from cart', async () => {
    const { user, unmount } = renderWithStore(<AddToCart recipe={RECIPE} />, {
      groceries: {
        isShopping: true,
        cart: {
          'Recipe Name': {
            recipe: RECIPE,
            ingredientTypes: ['ingredients'],
          },
        },
      },
    })

    await user.click(screen.getByText('In Cart'))
    screen.getByTestId('addToCart')

    unmount()
  })
})

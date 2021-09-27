module.exports = {
  META: {
    OG_TITLE: `meta[property='og:title']`,
    OG_IMAGE: `meta[property='og:image']`,
    OG_DESCRIPTION: `meta[property='og:description']`,
  },
  HOME: {
    RECIPE_CARD: `a.recipe-card`,
    COUNTER: `div[data-test-id='recipe-counter']`,
    SEARCH_BAR: `input[data-test-id='search-bar']`,

    LIGHT_BODY: `body:not(.dark-theme)`,
    DARK_BODY: `body.dark-theme`,
  },

  NAVBAR: {
    LOGIN_BUTTON: `div[data-test-id='login-button']`,
    LOG_OUT_BUTTON: `div[data-test-id='logout-button']`,

    SIGN_IN_MODAL: `div.sign-in-modal`,
    SIGN_IN_USERNAME: `input[data-test-id='login-username']`,
    SIGN_IN_PASSWORD: `input[data-test-id='login-password']`,
    SIGN_IN_SUBMIT: `button[data-test-id='login-submit']`,

    ARE_YOU_SURE_MODAL: `div.are-you-sure-modal`,
    ARE_YOU_SURE_SUBMIT: `button[data-test-id='are-you-sure-submit']`,

    MENU_TOGGLE: `[data-test-id='navbar-menu-toggle']`,
    MENU: `.navbar-menu-visible[data-test-id='navbar-menu']`,

    DARK_MODE_DARK: `.slant-toggle-wrapper [data-test-id='slant-toggle-A']`,
    DARK_MODE_DARK_ON: `.slant-toggle-wrapper [data-test-id='slant-toggle-A toggle-on']`,
    DARK_MODE_SLANT: `.slant-toggle-wrapper [data-test-id='slant-toggle-slant']`,
    DARK_MODE_SLANT_ON: `.slant-toggle-wrapper [data-test-id='slant-toggle-slant toggle-on']`,
    DARK_MODE_LIGHT: `.slant-toggle-wrapper [data-test-id='slant-toggle-B']`,
    DARK_MODE_LIGHT_ON: `.slant-toggle-wrapper [data-test-id='slant-toggle-B toggle-on']`,
  },
  RECIPE: {
    EDIT_BUTTON: `[data-test-id='edit-button']`,
    I_MADE_THIS_BUTTON: `button[data-test-id='i-made-this-button']`,
  },
  WRAPPERS: {
    PAGE_WRAPPER: '.App #pageWrapper',
    RECIPE_WRAPPER: '#recipeWrapper',
    GRID_WRAPPER: '#recipeGrid',
    FORM_WRAPPER: '#formWrapper',
  },
}

const initialState = {
  isLoggedIn: false,
}

var loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
      }

    case 'LOGOUT':
      return {
        isLoggedIn: false,
      }

    default:
      return state
  }
}

export default loginReducer

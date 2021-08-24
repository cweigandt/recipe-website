const initialState = {
  isLoggedIn: false,
  isUpToDate: false,
}

var loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      }

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
      }

    case 'LOGIN_SYNCED':
      return {
        ...state,
        isUpToDate: true,
      }

    default:
      return state
  }
}

export default loginReducer

var modalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        modal: action.modal,
      }

    case 'HIDE_MODAL':
      return {}

    default:
      return state
  }
}

export default modalReducer

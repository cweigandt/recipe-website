const originalState = {
  confirmedAreYouSureIds: [],
}

var modalReducer = (state = originalState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        modal: action.modal,
        id: action.id,
        additionalText: action.additionalText,
      }

    case 'HIDE_MODAL':
      return {
        confirmedAreYouSureIds: state.confirmedAreYouSureIds,
      }

    case 'CONFIRM_ARE_YOU_SURE':
      return {
        ...state,
        confirmedAreYouSureIds: state.confirmedAreYouSureIds.concat(action.id),
      }

    default:
      return state
  }
}

export default modalReducer

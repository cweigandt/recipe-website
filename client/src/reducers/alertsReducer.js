let uid = 0

var alertsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return [
        ...state,
        {
          text: action.text,
          style: action.style,
          id: uid++,
        },
      ]

    case 'REMOVE_ALERT':
      return state.filter((alert) => alert.id !== action.id)

    default:
      return state
  }
}

export default alertsReducer

let uid = 0

export const showModal = (modalType, additionalText) => {
  return {
    type: 'SHOW_MODAL',
    modal: modalType,
    id: uid++,
    additionalText,
  }
}

export const hideModal = (id) => {
  return {
    type: 'HIDE_MODAL',
    id,
  }
}

export const confirmAreYouSure = (id) => {
  return {
    type: 'CONFIRM_ARE_YOU_SURE',
    id,
  }
}

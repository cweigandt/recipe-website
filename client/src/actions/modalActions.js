let uid = 0

export const showModal = (modalType) => {
  return {
    type: 'SHOW_MODAL',
    modal: modalType,
    id: uid++,
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

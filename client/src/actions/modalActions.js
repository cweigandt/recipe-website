export const showModal = (modalType) => {
  return {
    type: 'SHOW_MODAL',
    modal: modalType,
  }
}

export const hideModal = () => {
  return {
    type: 'HIDE_MODAL',
  }
}

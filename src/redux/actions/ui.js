const setMode = mode => ({
  type: 'SET_MODE',
  mode
})

const toggleModal = modal => ({
  type: 'TOGGLE_MODAL',
  modal
})

export default {
  setMode,
  toggleModal
}
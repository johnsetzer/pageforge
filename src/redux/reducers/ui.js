const modalsOff = {
  designerModalOpen: false,
  helpModalOpen: false
}

const initialState = {
  ...modalsOff,
  mode: 'DEFAULT'
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODE':
      return {...state, ...modalsOff, mode: action.mode}
    case 'TOGGLE_MODAL':
      const toggleModalKey = `${action.modal.toLowerCase()}ModalOpen`
      const oldVal = state[toggleModalKey];

      const newState = {...state, ...modalsOff, mode: 'DEFAULT'}
      newState[toggleModalKey] = !oldVal;
      return newState
    default:
      return state
  }
}

export default uiReducer;
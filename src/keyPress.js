export default (event, toggleModal, setMode) => {
  let QUESTION_KEY = 63
  let A_KEY = 97
  let D_KEY = 100
  let M_KEY = 109
  let T_KEY = 116

  switch (event.which) {
    case QUESTION_KEY:
      toggleModal('HELP')
      break
    case D_KEY:
      toggleModal('DESIGNER')
      break
    case A_KEY:
      setMode('ADD_COMPONENT')
      break
    case M_KEY:
      setMode('MOVE_COMPONENT')
      break
    case T_KEY:
      setMode('ADD_TEXT_COMPONENT')
      break
    default:
  }
}

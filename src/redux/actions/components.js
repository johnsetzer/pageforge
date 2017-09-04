const createComponent = (left, top, width, height) => {
  return {
    type: 'CREATE_COMPONENT',
    left,
    top,
    width,
    height
  }
}

const selectComponent = (id) => {
  return {
    type: 'SELECT_COMPONENT',
    id
  }
}

const moveComponent = (id, left, top) => {
  return {
    type: 'MOVE_COMPONENT',
    id,
    left,
    top
  }
}

const renameComponent = (id, name) => {
  return {
    type: 'RENAME_COMPONENT',
    id,
    name
  }
}

const setComponentStyles = (id, styles) => {
  return {
    type: 'SET_COMPONENT_STYLES',
    id,
    styles
  }
}

export default {
  createComponent,
  selectComponent,
  moveComponent,
  renameComponent,
  setComponentStyles
}
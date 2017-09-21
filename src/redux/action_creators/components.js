let nextId = 1

// Call this in tests to make sure each test starts with a consistent state
const resetComponentCreator = () => {
  nextId = 1
}

const createComponent = (left, top, width, height) => ({
  type: 'CREATE_COMPONENT',
  id: nextId++,
  left,
  top,
  width,
  height
})

const selectComponent = id => ({
  type: 'SELECT_COMPONENT',
  id
})

const moveComponent = (id, left, top) => ({
  type: 'MOVE_COMPONENT',
  id,
  left,
  top
})

const renameComponent = (id, name) => ({
  type: 'RENAME_COMPONENT',
  id,
  name
})

const setComponentStyles = (id, styles) => ({
  type: 'SET_COMPONENT_STYLES',
  id,
  styles
})

export default {
  resetComponentCreator,
  createComponent,
  selectComponent,
  moveComponent,
  renameComponent,
  setComponentStyles
}

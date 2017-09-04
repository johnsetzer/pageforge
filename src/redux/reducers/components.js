let nextId = 1

const idMapAssign = (state, id, idMatchProps={}, idMissProps={}) => (
  state.map(comp =>
    (comp.id === id) 
      ? {...comp, ...idMatchProps}
      : {...comp, ...idMissProps}
  )
)

const selectComponent = (state, id) => {
  return idMapAssign(state, id, {selected: true}, {selected: false})
}

const componentReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_COMPONENT':
      const id = nextId++;
      const newComp = {
        id,
        name: `Component ${id}`,
        left: action.left,
        top: action.top,
        width: action.width,
        height: action.height,
        selected: false,
        styles: {}
      }
      return selectComponent([...state, newComp], id)

    case 'SELECT_COMPONENT':
      return selectComponent(state, action.id)

    case 'MOVE_COMPONENT':
      return idMapAssign(state, action.id, {left: action.left, top: action.top})

    case 'RENAME_COMPONENT':
      return idMapAssign(state, action.id, {name: action.name})

    case 'SET_COMPONENT_STYLES':
      return state.map(comp =>
        (comp.id === action.id) 
          ? {...comp, styles: {...comp.styles, ...action.styles}}
          : comp
      )

    default:
      return state
  }
}

export default componentReducer

export const findSelectedComponent = (components, id) => {
  for (let comp of components) {
    if (comp.id === id) {
      return comp
    } else {
      const found = findSelectedComponent(comp.children, id)
      if (found) {
        return found
      }
    }
  }

  return undefined
}

export const idMapAssign = (components, id, idMatchProps = {}) =>
  components.map(comp => {
    if (comp.id === id) {
      return { ...comp, ...idMatchProps }
    } else {
      comp.children = idMapAssign(comp.children, id, idMatchProps)
      return comp
    }
  })

export const isParent = (parent, child) =>
  parent.left <= child.left &&
  parent.top <= child.top &&
  parent.left + parent.width >= child.left + child.width &&
  parent.top + parent.height >= child.top + child.height

export const findParentComponent = (components, child) => {
  let parent = undefined

  components.forEach(c => {
    if (isParent(c, child)) {
      const tightParent = findParentComponent(c.children, child)
      parent = tightParent ? tightParent : c
    }
  })

  return parent
}

const componentsReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_COMPONENT': {
      const newComp = {
        id: action.id,
        name: `Component ${action.id}`,
        left: action.left,
        top: action.top,
        width: action.width,
        height: action.height,
        styles: {},
        children: []
      }

      const parent = findParentComponent(state, newComp)
      let newState
      if (parent) {
        newState = state
        parent.children = [...parent.children, newComp]
      } else {
        newState = [...state, newComp]
      }
      return newState
    }

    case 'MOVE_COMPONENT': {
      return idMapAssign(state, action.id, {
        left: action.left,
        top: action.top
      })
    }

    case 'RENAME_COMPONENT': {
      return idMapAssign(state, action.id, { name: action.name })
    }

    case 'SET_COMPONENT_STYLES': {
      const newComps = state.map(
        comp =>
          comp.id === action.id ? { ...comp, styles: { ...comp.styles, ...action.styles } } : comp
      )
      return newComps
    }

    default:
      return state
  }
}

const selectedComponentReducer = (state, action, components) => {
  switch (action.type) {
    case 'CREATE_COMPONENT':
    case 'SELECT_COMPONENT':
    case 'MOVE_COMPONENT':
    case 'RENAME_COMPONENT':
    case 'SET_COMPONENT_STYLES':
      return findSelectedComponent(components, action.id) || null

    default:
      return state
  }
}

const initialState = {
  selectedComponent: null,
  components: []
}

const componentReducer = (state = initialState, action) => {
  const components = componentsReducer(state.components, action)
  const selectedComponent = selectedComponentReducer(state.selectedComponent, action, components)

  return {
    components,
    selectedComponent
  }
}

export default componentReducer

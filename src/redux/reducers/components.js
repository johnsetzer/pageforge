import _ from 'lodash'
import { combineReducers } from 'redux'

const idMapAssign = (components, id, idMatchProps = {}) =>
  components.map(comp => (comp.id === id ? { ...comp, ...idMatchProps } : comp))

const findSelectedComponent = (components, id) => _.find(components, c => c.id === id)

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
        styles: {}
      }
      return [...state, newComp]
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

const componentReducer = (state=initialState, action) => {
  const components = componentsReducer(state.components, action)
  const selectedComponent = selectedComponentReducer(state.selectedComponent, action, components)

  return {
    components,
    selectedComponent
  }
}

export default componentReducer

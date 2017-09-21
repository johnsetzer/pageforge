import _ from 'lodash'

const idMapAssign = (components, id, idMatchProps = {}, idMissProps = {}) =>
  components.map(
    comp => (comp.id === id ? { ...comp, ...idMatchProps } : { ...comp, ...idMissProps })
  )

const findSelectedComponent = (components, id) => _.find(components, c => c.id === id)

const initialState = {
  selectedComponent: null,
  components: []
}

const componentReducer = (state = initialState, action) => {
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
      return { components: [...state.components, newComp], selectedComponent: newComp }
    }

    case 'SELECT_COMPONENT':
      return {
        components: state.components,
        selectedComponent: findSelectedComponent(state.components, action.id)
      }

    case 'MOVE_COMPONENT': {
      const newComps = idMapAssign(state.components, action.id, {
        left: action.left,
        top: action.top
      })
      return {
        components: newComps,
        selectedComponent: findSelectedComponent(newComps, action.id)
      }
    }

    case 'RENAME_COMPONENT': {
      const newComps = idMapAssign(state.components, action.id, { name: action.name })
      return {
        components: newComps,
        selectedComponent: findSelectedComponent(newComps, action.id)
      }
    }

    case 'SET_COMPONENT_STYLES': {
      const newComps = state.components.map(
        comp =>
          comp.id === action.id ? { ...comp, styles: { ...comp.styles, ...action.styles } } : comp
      )
      return {
        components: newComps,
        selectedComponent: findSelectedComponent(newComps, action.id)
      }
    }

    default:
      return state
  }
}

export default componentReducer

import _ from 'lodash'

const idMapAssign = (components, id, idMatchProps = {}, idMissProps = {}) =>
  components.map(
    comp => (comp.id === id ? { ...comp, ...idMatchProps } : { ...comp, ...idMissProps })
  )

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
      return { components: state.components, selectedComponent: _.find(state.components, c => c.id === action.id) }

    case 'MOVE_COMPONENT':
      return {
        components: idMapAssign(state.components, action.id, {
          left: action.left,
          top: action.top
        }),
        selectedComponent: state.selectedComponent
      }

    case 'RENAME_COMPONENT':
      return {
        components: idMapAssign(state.components, action.id, { name: action.name }),
        selectedComponent: state.selectedComponent
      }

    case 'SET_COMPONENT_STYLES':
      return {
        components: state.components.map(
          comp =>
            comp.id === action.id ? { ...comp, styles: { ...comp.styles, ...action.styles } } : comp
        ),
        selectedComponent: state.selectedComponent
      }

    default:
      return state
  }
}

export default componentReducer

import { combineReducers } from 'redux'
import components from './components'
import ui from './ui'

const reducer = combineReducers({
  components,
  ui
})

export default reducer

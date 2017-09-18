import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import App from './App'
import reducers from './redux/reducers'

it('renders without crashing', () => {
  const store = createStore(reducers)
  const div = document.createElement('div')
  ReactDOM.render(<App store={store}/>, div)
})

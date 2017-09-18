import { createStore } from 'redux'
import ui from '../reducers/ui'
import Actions from '../actions'
import deepFreeze from 'deep-freeze'

it('has initial state', () => {
  let store = createStore(ui)
  deepFreeze(store.getState())

  expect(store.getState()).toEqual({
    designerModalOpen: false,
    helpModalOpen: false,
    mode: 'DEFAULT'
  })
})

it('sets mode', () => {
  let store = createStore(ui)
  deepFreeze(store.getState())

  store.dispatch(Actions.setMode('ADD_COMPONENT'))

  expect(store.getState().mode).toBe('ADD_COMPONENT')
})

it('toggles modal flags', () => {
  let store = createStore(ui)
  deepFreeze(store.getState())

  store.dispatch(Actions.toggleModal('designer'))

  expect(store.getState().designerModalOpen).toBe(true)
})

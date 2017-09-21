import { createStore } from 'redux'
import ui from '../reducers/ui'
import Actions from '../action_creators'
import deepFreeze from 'deep-freeze'

let store

beforeEach(() => {
  store = createStore(ui)
  deepFreeze(store.getState())
})

it('sets initial state', () => {
  expect(store.getState()).toEqual({
    designerModalOpen: false,
    helpModalOpen: false,
    mode: 'DEFAULT'
  })
})

it('sets mode', () => {
  store.dispatch(Actions.setMode('ADD_COMPONENT'))

  expect(store.getState().mode).toBe('ADD_COMPONENT')
})

it('toggles modal flags', () => {
  store.dispatch(Actions.toggleModal('designer'))
  expect(store.getState().designerModalOpen).toBe(true)
  store.dispatch(Actions.toggleModal('designer'))
  expect(store.getState().designerModalOpen).toBe(false)
})

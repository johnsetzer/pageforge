import { createStore } from 'redux'
import components from '../reducers/components'
import Actions from '../actions'
import deepFreeze from 'deep-freeze'

it('creates components', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  store.dispatch(Actions.createComponent(1, 2, 3, 4))

  const afterOneCreate = [
    {
      id: 1,
      name: 'Component 1',
      selected: true,
      left: 1,
      top: 2,
      width: 3,
      height: 4,
      styles: {}
    }
  ]
  expect(store.getState()).toEqual(afterOneCreate)
})

it('selects the most recently created component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  store.dispatch(Actions.createComponent(1, 2, 3, 4))
  store.dispatch(Actions.createComponent(11, 12, 13, 14))

  expect(store.getState()[0].selected).toBe(false)
  expect(store.getState()[1].selected).toBe(true)
})

it('selects the a component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstComp = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstComp)
  store.dispatch(Actions.createComponent(11, 12, 13, 14))
  store.dispatch(Actions.selectComponent(firstComp.id))

  expect(store.getState()[0].selected).toBe(true)
  expect(store.getState()[1].selected).toBe(false)
})

it('moves a component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstComp = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstComp)
  store.dispatch(Actions.moveComponent(firstComp.id, 100, 200))

  expect(store.getState()[0].left).toBe(100)
  expect(store.getState()[0].top).toBe(200)
})

it('renames a component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstComp = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstComp)
  store.dispatch(Actions.renameComponent(firstComp.id, 'RENAMED'))

  expect(store.getState()[0].name).toBe('RENAMED')
})

it('sets componenet styels', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstComp = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstComp)
  store.dispatch(Actions.setComponentStyles(firstComp.id, { style1: 1, style2: 2 }))
  store.dispatch(Actions.setComponentStyles(firstComp.id, { style2: 'CHANGED', style3: 3 }))

  expect(store.getState()[0].styles).toEqual({ style1: 1, style2: 'CHANGED', style3: 3 })
})

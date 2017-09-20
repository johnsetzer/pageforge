import { createStore } from 'redux'
import components from '../reducers/components'
import Actions from '../action_creators'
import deepFreeze from 'deep-freeze'

it('creates components', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  store.dispatch(Actions.createComponent(1, 2, 3, 4))

  const newComp = {
    id: 1,
    name: 'Component 1',
    left: 1,
    top: 2,
    width: 3,
    height: 4,
    styles: {}
  }

  const afterOneCreate = {
    components: [newComp],
    selectedComponent: newComp
  }

  expect(store.getState()).toEqual(afterOneCreate)
})

it('creating a component selects the most recently created component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  store.dispatch(Actions.createComponent(1, 2, 3, 4))
  const secondAction = Actions.createComponent(11, 12, 13, 14)
  store.dispatch(secondAction)

  expect(store.getState().selectedComponent.id).toBe(secondAction.id)
})

it('selects the a component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstAction = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstAction)
  store.dispatch(Actions.createComponent(11, 12, 13, 14))
  store.dispatch(Actions.selectComponent(firstAction.id))

  expect(store.getState().selectedComponent.id).toBe(firstAction.id)
})

it('moves a component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstAction = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstAction)
  store.dispatch(Actions.moveComponent(firstAction.id, 100, 200))

  expect(store.getState().components[0].left).toBe(100)
  expect(store.getState().components[0].top).toBe(200)
})

it('renames a component', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstAction = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstAction)
  store.dispatch(Actions.renameComponent(firstAction.id, 'RENAMED'))

  expect(store.getState().components[0].name).toBe('RENAMED')
})

it('sets componenet styels', () => {
  let store = createStore(components)
  deepFreeze(store.getState())

  const firstAction = Actions.createComponent(1, 2, 3, 4)
  store.dispatch(firstAction)
  store.dispatch(Actions.setComponentStyles(firstAction.id, { style1: 1, style2: 2 }))
  store.dispatch(Actions.setComponentStyles(firstAction.id, { style2: 'CHANGED', style3: 3 }))

  expect(store.getState().components[0].styles).toEqual({ style1: 1, style2: 'CHANGED', style3: 3 })
})

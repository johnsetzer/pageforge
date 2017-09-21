import { createStore } from 'redux'
import components from '../reducers/components'
import Actions from '../action_creators'
import deepFreeze from 'deep-freeze'

let store

beforeEach(() => {
  Actions.resetComponentCreator()
  store = createStore(components)
  deepFreeze(store.getState())
})

it('creates components', () => {
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

  const afterCreate = {
    components: [newComp],
    selectedComponent: newComp
  }

  expect(store.getState()).toEqual(afterCreate)
})

it('creating a component selects the most recently created component', () => {
  store.dispatch(Actions.createComponent(1, 2, 3, 4))
  const secondAction = Actions.createComponent(11, 12, 13, 14)
  store.dispatch(secondAction)

  expect(store.getState().selectedComponent.id).toBe(secondAction.id)
})

it('selects the a component', () => {
  store.dispatch(Actions.createComponent(1, 2, 3, 4))
  store.dispatch(Actions.createComponent(11, 12, 13, 14))
  store.dispatch(Actions.selectComponent(1))

  expect(store.getState().selectedComponent.id).toBe(1)
})

it('moves a component', () => {
  store.dispatch(Actions.createComponent(1, 2, 3, 4))
  store.dispatch(Actions.moveComponent(1, 100, 200))

  expect(store.getState().components[0].left).toBe(100)
  expect(store.getState().components[0].top).toBe(200)
})

it('renames a component', () => {
  store.dispatch(Actions.createComponent(1, 2, 3, 4))
  store.dispatch(Actions.renameComponent(1, 'RENAMED'))

  expect(store.getState().components[0].name).toBe('RENAMED')
})

it('sets componenet styels', () => {
  store.dispatch(Actions.createComponent(1, 2, 3, 4))
  store.dispatch(Actions.setComponentStyles(1, { style1: 1, style2: 2 }))
  store.dispatch(Actions.setComponentStyles(1, { style2: 'CHANGED', style3: 3 }))

  expect(store.getState().components[0].styles).toEqual({ style1: 1, style2: 'CHANGED', style3: 3 })
})

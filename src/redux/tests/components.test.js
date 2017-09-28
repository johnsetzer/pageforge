import { createStore } from 'redux'
import components, {
  findSelectedComponent,
  idMapAssign,
  isParent,
  findParentComponent
} from '../reducers/components'
import Actions from '../action_creators'
import deepFreeze from 'deep-freeze'

describe('findSelectedComponent', () => {
  const comp1 = {
    id: 1,
    children: []
  }
  const comp3 = {
    id: 3,
    children: []
  }
  const comp2 = {
    id: 2,
    children: [comp3]
  }
  const comps = [comp1, comp2]

  it('finds component with matching id', () => {
    expect(findSelectedComponent(comps, 2)).toEqual(comp2)
    expect(findSelectedComponent(comps, 3)).toEqual(comp3)
  })

  it('returns undefined when there is no component with a matching id', () => {
    expect(findSelectedComponent(comps, 4)).toEqual(undefined)
  })
})

describe('idMapAssign', () => {
  const comp1 = {
    id: 1,
    left: 1,
    top: 2,
    children: []
  }
  const comp3 = {
    id: 3,
    left: 1,
    top: 2,
    children: []
  }
  const comp2 = {
    id: 2,
    left: 1,
    top: 2,
    children: [comp3]
  }
  const comp4 = {
    id: 4,
    left: 1,
    top: 2,
    children: []
  }

  const comps = [comp1, comp2, comp4]

  it('sets values on the component with matching id', () => {
    const changedComp4 = {
      id: 4,
      left: 'CHANGED',
      top: 'CHANGED',
      children: []
    }

    const expectedComps = [comp1, comp2, changedComp4]
    const actual = idMapAssign(comps, 4, { left: 'CHANGED', top: 'CHANGED' })

    expect(actual).toEqual(expectedComps)
  })

  it('sets values on the component with matching id in children', () => {
    const changedComp3 = {
      id: 3,
      left: 'CHANGED',
      top: 'CHANGED',
      children: []
    }

    const changedComp2 = {
      id: 2,
      left: 1,
      top: 2,
      children: [changedComp3]
    }

    const expectedComps = [comp1, changedComp2, comp4]
    const actual = idMapAssign(comps, 3, { left: 'CHANGED', top: 'CHANGED' })

    expect(actual).toEqual(expectedComps)
  })
})

describe('isParent', () => {
  const parent = { left: 100, top: 100, width: 100, height: 100 }

  it('returns true when child is inside the parent', () => {
    const inside = { left: 100, top: 100, width: 1, height: 1 }

    expect(isParent(parent, inside)).toBe(true)
  })

  it('returns false when child is outside the parent', () => {
    const above = { left: 100, top: 99, width: 100, height: 100 }
    const right = { left: 101, top: 100, width: 100, height: 100 }
    const below = { left: 100, top: 101, width: 100, height: 100 }
    const left = { left: 99, top: 100, width: 100, height: 100 }

    expect(isParent(parent, above)).toBe(false)
    expect(isParent(parent, right)).toBe(false)
    expect(isParent(parent, below)).toBe(false)
    expect(isParent(parent, left)).toBe(false)
  })
})

describe('findParentComponent', () => {
  const small = { left: 140, top: 140, width: 10, height: 10, children: [] }
  const medium = { left: 100, top: 100, width: 50, height: 50, children: [] }
  const medium2 = { left: 140, top: 140, width: 50, height: 50, children: [] }
  const mediumLarge = { left: 100, top: 100, width: 60, height: 60, children: [] }
  const large = { left: 100, top: 100, width: 100, height: 100, children: [medium, medium2] }

  it('returns the last of the smallest parents to the child', () => {
    expect(findParentComponent([large], small)).toEqual(medium2)
    expect(findParentComponent([large], mediumLarge)).toEqual(large)
  })

  it('returns undefined when no parent is found', () => {
    expect(findParentComponent([small], large)).toEqual(undefined)
  })
})

describe('components', () => {
  let store

  beforeEach(() => {
    Actions.resetComponentCreator()
    store = createStore(components)
    deepFreeze(store.getState())
  })

  it('has initial state of', () => {
    const initialState = {
      selectedComponent: null,
      components: []
    }

    expect(store.getState()).toEqual(initialState)
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
      styles: {},
      children: []
    }

    const afterCreate = {
      components: [newComp],
      selectedComponent: newComp
    }

    expect(store.getState()).toEqual(afterCreate)
  })

  it('creating a component selects the most recently created component', () => {
    store.dispatch(Actions.createComponent(1, 2, 3, 4))
    store.dispatch(Actions.createComponent(11, 12, 13, 14))

    expect(store.getState().selectedComponent.id).toBe(2)
  })

  it('creates a second and third component inside the first', () => {
    store.dispatch(Actions.createComponent(100, 200, 50, 50))
    store.dispatch(Actions.createComponent(105, 205, 10, 10))
    store.dispatch(Actions.createComponent(104, 204, 10, 10))

    const comps = store.getState().components

    expect(comps.length).toBe(1)
    expect(comps[0].children[0].id).toBe(2)
    expect(comps[0].children[1].id).toBe(3)
  })

  it('creates a third component inside the second', () => {
    store.dispatch(Actions.createComponent(100, 200, 50, 50))
    store.dispatch(Actions.createComponent(105, 205, 10, 10))
    store.dispatch(Actions.createComponent(105, 205, 5, 5))

    const comps = store.getState().components

    expect(comps.length).toBe(1)
    expect(comps[0].children[0].id).toBe(2)
    expect(comps[0].children[0].children[0].id).toBe(3)
  })

  it('creates a second component beside the first', () => {
    store.dispatch(Actions.createComponent(100, 200, 50, 50))
    store.dispatch(Actions.createComponent(105, 205, 50, 50))

    const comps = store.getState().components

    expect(comps.length).toBe(2)
    expect(comps[0].children).toEqual([])
    expect(comps[1].children).toEqual([])
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

  it('selects the a component when it is moved', () => {
    store.dispatch(Actions.createComponent(1, 2, 3, 4))
    store.dispatch(Actions.createComponent(11, 12, 13, 14))
    store.dispatch(Actions.moveComponent(1, 100, 200))

    expect(store.getState().selectedComponent.id).toBe(1)
  })

  it('renames a component', () => {
    store.dispatch(Actions.createComponent(1, 2, 3, 4))
    store.dispatch(Actions.renameComponent(1, 'RENAMED'))

    expect(store.getState().components[0].name).toBe('RENAMED')
  })

  it('selects a component when it is renamed', () => {
    store.dispatch(Actions.createComponent(1, 2, 3, 4))
    store.dispatch(Actions.createComponent(11, 12, 13, 14))
    store.dispatch(Actions.renameComponent(1, 'RENAMED'))

    expect(store.getState().selectedComponent.id).toBe(1)
  })

  it('sets componenet styels', () => {
    store.dispatch(Actions.createComponent(1, 2, 3, 4))
    store.dispatch(Actions.setComponentStyles(1, { style1: 1, style2: 2 }))
    store.dispatch(Actions.setComponentStyles(1, { style2: 'CHANGED', style3: 3 }))

    expect(store.getState().components[0].styles).toEqual({
      style1: 1,
      style2: 'CHANGED',
      style3: 3
    })
  })

  it('selects a component when it is restyled', () => {
    store.dispatch(Actions.createComponent(1, 2, 3, 4))
    store.dispatch(Actions.createComponent(11, 12, 13, 14))
    store.dispatch(Actions.setComponentStyles(1, { style1: 1, style2: 2 }))

    expect(store.getState().selectedComponent.id).toBe(1)
  })
})

import React from 'react'
import './ComponentListItem.css'

const ComponentListItem = ({ component: comp, selectedComponent, selectComponent }) => {
  const selected = comp === selectedComponent ? ' component-list-item--selected' : ''

  return (
    <li className={`component-list-item${selected}`} onClick={() => selectComponent(comp.id)}>
      {comp.name}
    </li>
  )
}

export default ComponentListItem

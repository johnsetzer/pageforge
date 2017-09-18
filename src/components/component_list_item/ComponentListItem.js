import React from 'react'
import './ComponentListItem.css'

const ComponentListItem = ({component: comp, selectComponent}) => {

  const selected = comp.selected === true ? ' component-list-item--selected' : ''
  
  return (
    <li className={`component-list-item${selected}`}
      onClick={() => selectComponent(comp.id)}>
      {comp.name}
    </li>
  );
}

export default ComponentListItem
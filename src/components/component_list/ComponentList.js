import React from 'react'
import ComponentListItem from '../component_list_item/ComponentListItem'
import './ComponentList.css'

const ComponentList = ({ components, selectedComponent, selectComponent }) => {
  return (
    <ul className="component-list">
      {components.map(c => (
        <ComponentListItem key={c.id} component={c} selectedComponent={selectedComponent} selectComponent={selectComponent} />
      ))}
    </ul>
  )
}

export default ComponentList

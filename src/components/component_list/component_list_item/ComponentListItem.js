import React from 'react'
import OneLineForm from '../../generic/one_line_form/OneLineForm'
import './ComponentListItem.css'

const ComponentListItem = ({
  component: comp,
  selectedComponent,
  selectComponent,
  renameComponent
}) => {
  const selected = comp === selectedComponent ? ' component-list-item--selected' : ''

  return (
    <li
      className={`component-list-item${selected}`}
      onClick={() => selectComponent(comp.id)}
      onKeyPress={e => {
        console.log('item')
      }}
    >
      <OneLineForm
        value={comp.name}
        onSubmit={name => {
          renameComponent(comp.id, name)
        }}
      />
    </li>
  )
}

export default ComponentListItem

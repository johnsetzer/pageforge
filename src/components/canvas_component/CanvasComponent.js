import React from 'react'
import './CanvasComponent.css'

const CanvasComponent = ({ component: comp, dragging, selectedComponent, selectComponent }) => {
  const style = {
    top: comp.top + 'px',
    left: comp.left + 'px',
    width: comp.width + 'px',
    height: comp.height + 'px',
    opacity: dragging ? 0.1 : '',
    backgroundColor: comp.styles.backgroundColor
  }

  const selected = comp === selectedComponent ? ' canvas-component--selected' : ''

  return (
    <div
      className={`canvas-component${selected}`}
      style={style}
      draggable="true"
      onMouseDown={() => selectComponent(comp.id)}
    >
      <div className="canvas-component-title">{comp.name}</div>
    </div>
  )
}

export default CanvasComponent

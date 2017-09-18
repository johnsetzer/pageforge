import React from 'react'
import './CanvasComponent.css'

const CanvasComponent = ({component: comp, dragging, selectComponent}) => {
  
  const style = {
    top: comp.top + 'px',
    left: comp.left + 'px',
    width: comp.width + 'px',
    height: comp.height + 'px',
    opacity: dragging ? 0.1 : '',
    "backgroundColor": comp.styles.color
  }

  const selected = comp.selected ? ' canvas-component--selected' : ''

  return (
    <div className={`canvas-component${selected}`}  
      style={style}
      draggable="true"
      onMouseDown={() => selectComponent(comp.id)}>
      <div className="canvas-component-title">
        {comp.name}
      </div>
    </div>
  )
}

export default CanvasComponent;
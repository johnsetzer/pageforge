import React, { Component } from 'react'
import './CanvasComponent.css'

class CanvasComponent extends Component {

  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (event) {
    this.props.selectComponent(this.props.component.id)
  }

  render() {
    const comp = this.props.component

    const style = {
      top: comp.top + 'px',
      left: comp.left + 'px',
      width: comp.width + 'px',
      height: comp.height + 'px',
      opacity: this.props.dragging ? 0.5 : '',
      "backgroundColor": comp.styles.color
    }

    const selected = comp.selected ? ' canvas-component--selected' : ''

    return (
      <div className={`canvas-component${selected}`}  
        style={style}
        draggable="true"
        onMouseDown={this.handleMouseDown}>
        <div className="canvas-component-title">
          {comp.name}
        </div>
      </div>
    )
  }
}

export default CanvasComponent;
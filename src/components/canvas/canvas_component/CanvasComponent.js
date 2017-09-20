import React from 'react'
import './CanvasComponent.css'

class CanvasComponent extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      dragging: false
    }
  }

  render () {
    const { component: comp, dragging, selectedComponent, selectComponent } = this.props;
    
    const style = {
      top: comp.top + 'px',
      left: comp.left + 'px',
      width: comp.width + 'px',
      height: comp.height + 'px',
      opacity: this.state.dragging ? 0.3 : '',
      backgroundColor: comp.styles.backgroundColor
    }

    const selected = comp === selectedComponent ? ' canvas-component--selected' : ''
    
    return (
      <div
        className={`canvas-component${selected}`}
        style={style}
        draggable="true"
        onMouseDown={() => selectComponent(comp.id)}
        onDragStart={() => {this.setState({ dragging: true })}}
        onDragEnd={() => {this.setState({ dragging: false })}}
      >
        <div className="canvas-component-title">{comp.name}</div>
      </div>
    )
  }
}

export default CanvasComponent

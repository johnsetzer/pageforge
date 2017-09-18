import React, { Component } from 'react'
import CanvasComponent from '../canvas_component/CanvasComponent'
import DesignerModal from '../designer_modal/DesignerModal.js'
import './Canvas.css'

const MIN_COMPONENT_LENGTH = 10

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downX: 0,
      downY: 0
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleDragEnter = this.handleDragEnter.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
  }

  // Browsers wont fire onDrop unless you specify onDragEnter as well
  handleDragEnter(event) {
    event.preventDefault()
  }

  // Browsers wont fire onDrop unless you specify onDragOver as well
  handleDragOver(event) {
    event.preventDefault()
  }

  handleMouseDown(event) {
    this.setState({
      downX: event.clientX,
      downY: event.clientY
    })
  }

  handleMouseUp(event) {
    if (this.props.ui.mode === 'ADD_COMPONENT') {
      const deltaX = event.clientX - this.state.downX
      const deltaY = event.clientY - this.state.downY
      const offsetX = event.nativeEvent.offsetX
      const offsetY = event.nativeEvent.offsetY

      // Draw from topmost, leftmost corner
      // User can drag backwards
      let left = offsetX - deltaX
      let top = offsetY - deltaY
      left = left < offsetX ? left : offsetX
      top = top < offsetY ? top : offsetY

      const width = Math.abs(deltaX)
      const height = Math.abs(deltaY)

      if (width > MIN_COMPONENT_LENGTH && height > MIN_COMPONENT_LENGTH) {
        this.props.createComponent(left, top, width, height)
      }
    }
  }

  handleDrop(event) {
    if (this.props.ui.mode === 'MOVE_COMPONENT') {
      const deltaX = event.clientX - this.state.downX
      const deltaY = event.clientY - this.state.downY

      const comp = this.props.selectedComponent
      const newX = comp.left + deltaX
      const newY = comp.top + deltaY

      this.props.moveComponent(comp.id, newX, newY)
    }
  }

  cursorStyle(mode) {
    switch (mode) {
      case 'ADD_COMPONENT':
        return 'crosshair'
      case 'ADD_TEXT_COMPONENT':
        return 'text'
      case 'MOVE_COMPONENT':
        return 'move'
      default:
        return 'default'
    }
  }

  render() {
    const {
      components,
      selectedComponent,
      selectComponent,
      moveComponent,
      changeComponentColor,
      closeDesignerModal
    } = this.props

    const { mode, designerModalOpen } = this.props.ui

    const BELOW = 15
    let left = 0
    let top = 0

    if (selectedComponent) {
      left = selectedComponent.left
      top = selectedComponent.top + selectedComponent.height + BELOW
    }

    return (
      <div
        className="canvas"
        style={{ cursor: this.cursorStyle(mode) }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className="canvas-position-container">
          {components.map(c => (
            <CanvasComponent
              component={c}
              key={c.id}
              selectComponent={selectComponent}
              moveComponent={moveComponent}
            />
          ))}
          {designerModalOpen &&
            selectedComponent && (
              <DesignerModal
                selectedComponent={selectedComponent}
                onColorChange={changeComponentColor}
                left={left}
                top={top}
                closeModal={closeDesignerModal}
              />
            )}
        </div>
      </div>
    )
  }
}

export default Canvas

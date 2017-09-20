import React from 'react'
import './Modal.css'

/**
 * left and top => Where to render the modal, if ommited modal is centered on screen
 * overlay => Should there be a grayed out background behind modal
 */
class Modal extends React.PureComponent {
  render() {
    const { left, top, title, children, overlay = true, closeModal } = this.props

    let backgroundStyles = {}
    let boxStyles = {}
    if (Number.isInteger(left) && Number.isInteger(top)) {
      backgroundStyles = {
        position: 'absolute'
      }
      boxStyles = {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`
      }
    }

    if (!overlay) {
      backgroundStyles.backgroundColor = 'transparent'
    }

    return (
      <div className="modal-background" style={backgroundStyles} onClick={closeModal}>
        <div
          className="modal-box"
          style={boxStyles}
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <div className="modal-title">{title}</div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    )
  }
}

export default Modal

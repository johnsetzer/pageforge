import React from 'react'
import './Modal.css'

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const {left, top, title, children, overlay=true, closeModal} = this.props
    
    let modalProps = {}
    let boxProps = {}
    if (Number.isInteger(left) && Number.isInteger(top)) {
      modalProps = {
        position: 'absolute'
      }
      boxProps = {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`
      }
    }
    
    if (!overlay) {
      modalProps.backgroundColor='transparent'
    }
  
    return (
      <div className="modal" style={modalProps} onClick={closeModal}>
        <div className="modal-box" style={boxProps} onClick={(e)=>{e.stopPropagation()}}>
          <div className="modal-title">{title}</div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    )
  }
}

export default Modal
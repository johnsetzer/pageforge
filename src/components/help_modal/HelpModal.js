import React from 'react'
import Modal from '../modal/Modal.js'
import './HelpModal.css'

const HelpModal = props => {
  return (
    <Modal title="Help" closeModal={props.closeModal}>
      <div className="help-modal">
        <div>
          <span className="help-modal-key">A</span> - Add Component
        </div>
        <div>
          <span className="help-modal-key">M</span> - Move Component
        </div>
        <div>
          <span className="help-modal-key">?</span> - Open Help
        </div>
      </div>
    </Modal>
  )
}

export default HelpModal

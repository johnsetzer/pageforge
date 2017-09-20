import React from 'react'
import { connect } from 'react-redux'
import Modal from '../modal/Modal.js'
import Actions from '../../redux/actions'
import './HelpModal.css'

const HelpModal = props => {
  if (!props.open) {
    return null;
  }

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

const mapStateToProps = (state) => ({
  open: state.ui.helpModalOpen
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(Actions.toggleModal('HELP'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HelpModal)

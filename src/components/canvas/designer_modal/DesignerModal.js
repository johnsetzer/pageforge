import React from 'react'
import Modal from '../../generic/modal/Modal.js'
import ColorPickerButton from '../../generic/color_picker_button/ColorPickerButton.js'
import OneLineForm from '../../generic/one_line_form/OneLineForm'
import './DesignerModal.css'

const DesignerModal = ({ left, top, closeModal, selectedComponent, renameComponent, onColorChange }) => {
  const { id, name, styles } = selectedComponent

  const title = (
    <OneLineForm
      value={name}
      onSubmit={(name)=>{renameComponent(id, name)}}
    />
  )

  return (
    <Modal title={title} left={left} top={top} overlay={false} closeModal={closeModal}>
      <div>
        <div className="desginer-modal-half">
          <ColorPickerButton
            color={styles.backgroundColor}
            onColorChange={color => onColorChange(id, color)}
          />
        </div>
        <div className="desginer-modal-half desginer-modal-center-picker">
          <div className="center-picker-under-contruction">Under Construction</div>
          <img className="center-picker" src="/centering_widget.png" alt="centering widget" />
        </div>
      </div>
    </Modal>
  )
}

export default DesignerModal

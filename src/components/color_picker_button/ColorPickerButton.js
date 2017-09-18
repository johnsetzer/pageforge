import React from 'react'
import { SketchPicker } from 'react-color'
import './ColorPickerButton.css'

class ColorPickerButton extends React.Component {
  state = {
    displayColorPicker: false,
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleChange = (color) => {
    this.props.onColorChange(color.hex)
  }

  render() {
    return (
      <div className="color-picker-button">
        <div className="color-picker-button-swatch" onClick={this.handleClick}>
          <div className="color-picker-button-color" style={{'backgroundColor': this.props.color}} />
        </div>
        {this.state.displayColorPicker && 
        <div className="color-picker-button-popover">
          <div className="color-picker-button-cover" onClick={this.handleClose}/>
          <SketchPicker
            color={this.props.color}
            onChangeComplete={this.handleChange}/>
        </div>}

      </div>
    )
  }
}

export default ColorPickerButton
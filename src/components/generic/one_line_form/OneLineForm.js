import React from 'react';
import './OneLineForm.css';

class OneLineForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      canFocus: true
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  onChange(event) {
    this.setState({value: event.target.value})
  }

  close() {
    this.setState({canFocus: false})
    document.activeElement.blur()
  }

  onSubmit(event) {
    event.preventDefault()
    this.close()
    this.props.onSubmit(this.state.value)
  }

  onKeyDown(event) {
    const ESC_KEY = 27
    if (event.which === ESC_KEY && this.input === document.activeElement) {
      this.close()
    }
  }

  onKeyPress(event) {
    event.stopPropagation()
  }

  onMouseOut(event) {
    this.setState({canFocus: true});
  }

  render () {
    const focusClass = this.state.canFocus ? ' one-line-form-input--can-focus' : ''
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text"
          className={`one-line-form-input${focusClass}`}
          placeholder={this.props.placeHolder}
          ref={(input) => { this.input = input }} 
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress}
          onMouseOut={this.onMouseOut}
        />
      </form>
    )
  }
}

export default OneLineForm
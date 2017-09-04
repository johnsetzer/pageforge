import React, { Component } from 'react'
import './ComponentListItem.css'

class ComponentListItem extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault()
    this.props.selectComponent(this.props.component.id)
  }

  render() {
    const comp = this.props.component
    const selected = comp.selected === true ? ' component-list-item--selected' : ''
    
    return (
      <li className={`component-list-item${selected}`}
        onClick={this.handleClick}>
        {comp.name}
      </li>
    );
  }
}

export default ComponentListItem
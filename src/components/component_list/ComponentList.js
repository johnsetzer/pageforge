import React, { Component } from 'react'
import ComponentListItem from '../component_list_item/ComponentListItem'
import './ComponentList.css'

class ComponentList extends Component {

  render() {
    return (
      <ul className="component-list">
        {this.props.components.map((c) =>
          <ComponentListItem key={c.id} component={c} selectComponent={this.props.selectComponent} />
        )}
      </ul>
    )
  }
}

export default ComponentList
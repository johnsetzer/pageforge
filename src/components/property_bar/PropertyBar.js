import React from 'react'
import cssProps from '../../util/SanitizedCSSProperties'
import './PropertyBar.css'

const randomCssPropValue = prop => {
  const randomIndex = Math.floor(Math.random() * prop.values.length)
  return prop.values[randomIndex]
}

class PropertyBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cssProps: cssProps.map(prop => ({
        name: prop.property,
        value: randomCssPropValue(prop)
      }))
    }
  }

  render() {
    return (
      <div className="property-bar">
        <h2 className="property-bar-h2">Daunting Property List</h2>
        <ul className="property-bar-list">
          {this.state.cssProps.map(prop => (
            <li key={prop.name} className="property-bar-item">
              <strong className="property-bar-prop">{prop.name}:</strong> {prop.value}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PropertyBar

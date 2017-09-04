import React from 'react'
import cssProps from '../../util/SanitizedCSSProperties'
import './PropertyBar.css'

class PropertyBar extends React.Component {
  
  randomValue (prop) {
    const randomIndex = Math.floor(Math.random() * prop.values.length)
    return prop.values[randomIndex]
  }

  render () {
    return (
      <div className="property-bar">
        <h2 className="property-bar-h2">Daunting Property List</h2>
        <ul className="property-bar-list">
          {cssProps.map(prop => (
            <li key={prop.property} className="property-bar-item">
              <strong className="property-bar-prop">{prop.property}:</strong> {this.randomValue(prop)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PropertyBar
import cssProps from 'css-properties-values'
import _ from 'lodash'

// Remove duplicate properties
let sanitizedProps = _.uniqBy(cssProps, p => p.property)

// Make sure every property has at least one value
_.each(sanitizedProps, (p) => {
  if (!p.values) {
    p.values = ['inherit']
  }
})

export default sanitizedProps
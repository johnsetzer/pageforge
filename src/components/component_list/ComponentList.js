import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../redux/action_creators'
import ComponentListItem from './component_list_item/ComponentListItem'
import './ComponentList.css'

const ComponentList = ({ components, selectedComponent, selectComponent }) => {
  return (
    <ul className="component-list">
      {components.map(c => (
        <ComponentListItem key={c.id} component={c} selectedComponent={selectedComponent} selectComponent={selectComponent} />
      ))}
    </ul>
  )
}

const mapStateToProps = (state) => ({
  components: state.components.components,
  selectedComponent: state.components.selectedComponent
})

const mapDispatchToProps = (dispatch) => ({
  selectComponent: id => {
    dispatch(Actions.selectComponent(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ComponentList)

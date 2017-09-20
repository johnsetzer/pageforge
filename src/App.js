import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './components/header/Header'
import ComponentList from './components/component_list/ComponentList'
import Canvas from './components/canvas/Canvas'
import PropertyBar from './components/property_bar/PropertyBar'
import HelpModal from './components/help_modal/HelpModal'
import Actions from './redux/actions'
import keyPress from './keyPress'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress(event) {
    keyPress(event, this.props.toggleModal, this.props.setMode)
  }

  render() {
    const {
      components,
      selectedComponent,
      selectComponent,
      createComponent,
      moveComponent,
      changeComponentColor
    } = this.props
    return (
      <div className="app">
        <Header />
        <div className="columns">
          <ComponentList />
          <Canvas
            components={components}
            selectedComponent={selectedComponent}
            ui={this.props.ui}
            createComponent={createComponent}
            selectComponent={selectComponent}
            moveComponent={moveComponent}
            changeComponentColor={changeComponentColor}
            closeDesignerModal={() => {
              this.props.toggleModal('DESIGNER')
            }}
          />
          <PropertyBar />
          <HelpModal />
        </div>
      </div>
    )
  }
}

// TODO ComponentList and Canvas can connect themselves to the store.

const mapStateToProps = (state, ownProps) => ({
  components: state.components.components,
  selectedComponent: state.components.selectedComponent,
  ui: state.ui
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createComponent: (left, top, width, height) => {
    dispatch(Actions.createComponent(left, top, width, height))
  },
  selectComponent: id => {
    dispatch(Actions.selectComponent(id))
  },
  moveComponent: (id, left, top) => {
    dispatch(Actions.moveComponent(id, left, top))
  },
  changeComponentColor: (id, color) => {
    dispatch(Actions.setComponentStyles(id, { backgroundColor: color }))
  },
  setMode: mode => {
    dispatch(Actions.setMode(mode))
  },
  toggleModal: modal => {
    dispatch(Actions.toggleModal(modal))
  }
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp

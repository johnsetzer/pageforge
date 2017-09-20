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
    return (
      <div className="app">
        <Header />
        <div className="columns">
          <ComponentList />
          <Canvas />
          <PropertyBar />
          <HelpModal />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setMode: mode => {
    dispatch(Actions.setMode(mode))
  },
  toggleModal: modal => {
    dispatch(Actions.toggleModal(modal))
  }
})

const ConnectedApp = connect(null, mapDispatchToProps)(App)

export default ConnectedApp

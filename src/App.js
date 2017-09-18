import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './components/header/Header'
import ComponentList from './components/component_list/ComponentList'
import Canvas from './components/canvas/Canvas'
import PropertyBar from './components/property_bar/PropertyBar'
import HelpModal from './components/help_modal/HelpModal'
import Actions from './redux/actions'

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
    let QUESTION_KEY = 63
    let A_KEY = 97
    let D_KEY = 100
    let M_KEY = 109
    let T_KEY = 116

    switch (event.which) {
      case QUESTION_KEY:
        this.props.toggleModal('HELP')
        break
      case D_KEY:
        this.props.toggleModal('DESIGNER')
        break
      case A_KEY:
        this.props.setMode('ADD_COMPONENT')
        break
      case M_KEY:
        this.props.setMode('MOVE_COMPONENT')
        break
      case T_KEY:
        this.props.setMode('ADD_TEXT_COMPONENT')
        break
      default:
    }
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
          <ComponentList components={components} selectedComponent={selectedComponent} selectComponent={selectComponent} />
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
          {this.props.ui.helpModalOpen && (
            <HelpModal
              closeModal={() => {
                this.props.toggleModal('HELP')
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  components: state.components.components,
  selectedComponent: state.components.selectedComponent,
  ui: state.ui
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp

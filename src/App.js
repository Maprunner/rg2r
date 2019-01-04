import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './containers/Header.js'
import InfoPanel from './containers/InfoPanel.js'
import Canvas from './containers/Canvas.js'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { loadEvents, screenResized, timerExpired } from './actions/actions.js'
import {
  faCheck, faQuestion, faPause, faPlay, faUsers, faClock, faEye,
  faSearch, faGlobeAmericas, faInfoCircle, faCaretRight, faCaretDown, faPlusSquare, faMinusSquare,
  faSyncAlt, faRedoAlt, faUndoAlt, faCog, faCaretLeft
} from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

class App extends Component {

  constructor() {
    super()
    library.add(faCheck, faQuestion, faPause, faPlay, faUsers, faClock, faEye,
      faSearch, faGlobeAmericas, faInfoCircle, faCaretRight, faCaretDown, faPlusSquare, faMinusSquare,
      faSyncAlt, faRedoAlt, faUndoAlt, faCog, faCircle, faCaretLeft)
    this.timer = null
  }

  componentDidMount() {
    // initialise screen size and then watch for future changes
    this.props.dispatch(screenResized())
    window.addEventListener('resize', () => {
      this.props.dispatch(screenResized())
    })
    // load events as part of starting up app
    this.props.dispatch(loadEvents())
    // for now this runs all the time and a thunk decides if it is needed each time it expires
    this.timer = setInterval(this.timerExpired, 100)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  timerExpired = () => {
    this.props.dispatch(timerExpired())
  }

  render() {
    return (
      <div>
        <div id="rg2-header-container">
          <Header />
        </div>
        <div id="rg2-container">
          <InfoPanel />
          <Canvas />
        </div>
      </div>
    )
  }
}

export default connect()(App)

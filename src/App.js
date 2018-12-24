import React, { Component } from 'react'
import { connect } from 'react-redux'
import TopToolbar from './components/TopToolbar.js'
import InfoPanel from './containers/InfoPanel.js'
import Canvas from './containers/Canvas.js'
import './rg2novalight.css'
import './rg2primereact.css'
import 'primeicons/primeicons.css'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { loadEvents, screenResized, timerExpired } from './actions/actions.js'
import {
  faCheck, faQuestion, faPause, faPlay, faUsers, faClock, faEye,
  faSearch, faGlobeAmericas, faInfoCircle
} from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  constructor() {
    super()
    library.add(faCheck, faQuestion, faPause, faPlay, faUsers, faClock, faEye, faSearch, faGlobeAmericas, faInfoCircle)
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
          <TopToolbar title={"Routegadget 2"} />
        </div>
        <div id="rg2-canvas-container">
          <InfoPanel />
          <Canvas />
        </div>
      </div>
    )
  }
}

export default connect()(App)

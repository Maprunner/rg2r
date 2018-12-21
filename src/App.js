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
import { faCheck, faQuestion, faPause, faPlay, faUsers, faClock, faEye } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

  constructor() {
    super()
    library.add(faCheck, faQuestion, faPause, faPlay, faUsers, faClock, faEye)
    let activeEvent = { id: null }
    this.timer = null
    this.state = {
      title: "Routegadget 2",
      courses: [],
      results: [],
      controls: [],
      runners: [],
      activeEvent: activeEvent
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.dispatch(screenResized());
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
          <TopToolbar title={this.state.title} />
        </div>
        <div id="rg2-body-container">
          <InfoPanel />
          <Canvas />
        </div>
      </div>
    )
  }
}

export default connect()(App)

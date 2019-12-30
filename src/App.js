import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './containers/Header.js'
import InfoPanel from './containers/InfoPanel.js'
import ConfigPanel from './containers/ConfigPanel.js'
import Canvas from './containers/Canvas.js'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { initialiseOptions, loadEvents, navigation, screenResized, timerExpired } from './actions/actions.js'
import { loadLanguage } from './actions/configActions.js'
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
    this.initialiseConfig()
    // initialise screen size and then watch for future changes
    this.props.dispatch(screenResized())
    window.addEventListener('resize', () => {
      this.props.dispatch(screenResized())
    })
    window.onpopstate = (event) => {
      if (event.state) {
        this.props.dispatch(navigation(event.state.hash))
      }
    };
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

  initialiseConfig() {
    if (process.env.NODE_ENV !== 'production') {
      // production environment uses index.php to set configuration
      // so need to set up equivalent config for localhost test environment
      // TODO: read from rg2-config.php? or a new config.js?
      window.rg2Config.json_url = '//localhost:3000/rg2/rg2api.php'
      window.rg2Config.maps_url = '../rg2-test-data/hh/kartat/'
    }
    if (window.rg2Config.start_language !== "en") {
      this.props.dispatch(loadLanguage(window.rg2Config.start_language))
    }
    // read local storage to get saved config
    try {
      if ((window.hasOwnProperty('localStorage')) && (window.localStorage !== null)) {
        if (localStorage.getItem('rg2-options') !== null) {
          const storedOptions = JSON.parse(localStorage.getItem('rg2-options'))
          let options = []
          for (let prop in storedOptions) {
            // probably a redundant check but it prevents lint from complaining
            if (storedOptions.hasOwnProperty(prop)) {
              options[prop] = storedOptions[prop]
            }
          }
          if (options.mapIntensity === 0) {
            // TODO: warnings
            //rg2.utils.showWarningDialog("Warning", "Your saved settings have 0% map intensity so the map is invisible. You can adjust this on the configuration menu");
          }
          this.props.dispatch(initialiseOptions(options))
        }
      }
    } catch (e) {
      // storage not supported so just continue
      console.log('Local storage not supported');
    }
  }

  render() {
    return (
      <div>
        <div id="rg2-header-container">
          <Header />
        </div>
        <div id="rg2-container">
          <InfoPanel />
          <ConfigPanel />
          <Canvas />
        </div>
      </div>
    )
  }
}

export default connect()(App)

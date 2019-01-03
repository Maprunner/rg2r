import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../rg2-logo.png'

class TopPanel extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="flex-grow-1">
          <img className="pr-2" src={logo} alt="logo" />
          <span className="rg2-title align-middle px-2">{this.props.title}</span>
        </div>
        <div>
          <span className="px-1 align-middle"><FontAwesomeIcon icon={'circle'} color='white' size="lg" onClick={() => this.props.onRotate(true)} /></span>
          <span className="px-1 align-middle"><FontAwesomeIcon icon={'cog'} color='white' size="lg" onClick={() => this.props.onResetMap()} /></span>
          <span className="px-1 align-middle"><FontAwesomeIcon icon={'question'} color='white' size="lg" onClick={() => this.props.onShowInfo()} /></span>
        </div>
      </div >
    )
  }
}
export default TopPanel

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Help from './Help.js'
import logo from '../rg2-logo.png'

class TopPanel extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="flex-grow-1">
          <img onClick={this.props.onToggleInfo} className="pr-2" src={logo} alt="logo" />
          <span className="rg2-title align-middle px-2">{this.props.title}</span>
        </div>
        <div>
          <span className="px-1 align-middle"><FontAwesomeIcon
            icon={['far', 'circle']} 
            color='white' 
            size="lg" 
            onClick={() => this.props.onToggleControls()} />
          </span>
          <span className="px-1 align-middle"><FontAwesomeIcon
            icon={'cog'} 
            color='white'
            size="lg" 
            onClick={() => this.props.onToggleConfig()} />
          </span>
          <Help />
        </div>
      </div >
    )
  }
}
export default TopPanel

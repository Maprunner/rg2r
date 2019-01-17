import React, { Component } from 'react'
import SingleRoute from './SingleRoute.js'
import Utils from '../utils/rg2utils.js'

class AllRoutes extends Component {
  render() {
    if (this.props.routes.length === 0) {
      return null
    }
    const allRoutes = []
    let xy
    // routes already filtered so we just display everything we get
    for (let i = 0; i < this.props.routes.length; i += 1) {
      xy = Utils.mergeXYArray(this.props.routes[i].x, this.props.routes[i].y)
      allRoutes.push(<SingleRoute key={i} points={xy} colour={this.props.routes[i].colour} width={this.props.opt.courseWidth} />)
    }
    return (
      <>
        {allRoutes}
      </>
    )
  }
}

export default AllRoutes

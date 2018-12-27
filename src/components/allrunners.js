import React, { Component } from 'react'
import SingleRunner from './SingleRunner.js'
import Utils from '../utils/rg2utils.js'

class AllRunners extends Component {
  getPoints(runner, animation) {
    let xy
    let timeOffset
    if (animation.realTime) {
      timeOffset = runner.starttime
    } else {
      //if ((this.massStartControl === 0) || (runner.splits.length < this.massStartControl)) {
      // no offset since we are starting from the start
      timeOffset = 0
      //} else {
      //  // offset needs to move forward (hence negative) to time at control
      //  timeOffset = -1 * result.splits[this.massStartControl]
      //}
    }
    // TODO: complicated stop at control logic missing
    xy = Utils.mergeXYArray(
      runner.x.slice(animation.tailStartTimeSecs - timeOffset, animation.time - timeOffset),
      runner.y.slice(animation.tailStartTimeSecs - timeOffset, animation.time - timeOffset)
    )
    return xy
  }

  render() {
    if (this.props.runners.length === 0) {
      return null
    }
    const allRunners = []
    let xy
    for (let i = 0; i < this.props.runners.length; i += 1) {
      xy = this.getPoints(this.props.runners[i], this.props.animation)
      allRunners.push(<SingleRunner key={i} points={xy} colour={"red"} />)
    }
    return (
      <>
        {allRunners}
      </>
    )
  }
}

export default AllRunners

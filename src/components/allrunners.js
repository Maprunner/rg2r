import React, { Component } from 'react';
import SingleRunner from './singlerunner.js';
// import RG2 from '../rg2Constants.js'
import Utils from '../utils/rg2utils.js';

class AllRunners extends Component {
  getPoints(runner, replay) {
    let xy;
    let timeOffset;
    if (replay.realTime) {
      timeOffset = runner.starttime;
    } else {
      //if ((this.massStartControl === 0) || (runner.splits.length < this.massStartControl)) {
      // no offset since we are starting from the start
      timeOffset = 0;
      //} else {
      //  // offset needs to move forward (hence negative) to time at control
      //  timeOffset = -1 * result.splits[this.massStartControl];
      //}
    }
    // TODO: complicated stop at control logic missing
    xy = Utils.mergeXYArray(
      runner.x.slice(replay.tailStartTimeSecs - timeOffset, replay.time - timeOffset),
      runner.y.slice(replay.tailStartTimeSecs - timeOffset, replay.time - timeOffset)
    );
    return xy;
  }

  render() {
    if ((this.props.runners === undefined) || (this.props.map === null)) {
      return null;
    }
    const allRunners = [];
    let xy;
    for (let i = 0; i < this.props.runners.length; i += 1) {
      xy = this.getPoints(this.props.runners[i], this.props.replay);
      allRunners.push(<SingleRunner key={i} points={xy} colour={"red"} />);
    }
    return (
      <>
        {allRunners}
      </>
    );
  }
}

export default AllRunners;

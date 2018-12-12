import React, { Component } from 'react';
import SingleRunner from './singlerunner.js';
// import RG2 from '../rg2Constants.js'
import Utils from '../utils/rg2utils.js';

class AllRunners extends Component {
  render() {
    if ((this.props.runners === undefined) || (this.props.map === null)) {
      return null;
    }
    console.log(this.props.time);
    const allRunners = [];
    let xy;
    for (let i = 0; i < this.props.runners.length; i += 1) {
      xy = Utils.mergeXYArray(this.props.runners[i].x.slice(0, this.props.time), this.props.runners[i].y.slice(0, this.props.time));
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

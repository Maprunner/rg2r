import React, { Component } from 'react';
import SingleCourseOverprint from './singlecourseoverprint.js';
import RG2 from '../rg2Constants.js'

class AllCoursesOverprint extends Component {
  getOverprintDetails({ height, width }) {
    var opt, scaleFact, circleSize;
    opt = {};
    // attempt to scale overprint depending on map image size
    // this avoids very small/large circles, or at least makes things a bit more sensible
    // Empirically derived  so open to suggestions. This is based on a nominal 20px circle
    // as default. The square root stops things getting too big too quickly.
    // 1500px is a typical map image maximum size.
    scaleFact = Math.pow(Math.min(height, width) / 1500, 0.5);
    // don't get too carried away, although these would be strange map files
    scaleFact = Math.min(scaleFact, 5);
    scaleFact = Math.max(scaleFact, 0.5);
    //circleSize = Math.round(rg2.options.circleSize * scaleFact);
    circleSize = Math.round(20 * scaleFact);
    // ratios based on IOF ISOM overprint specification
    opt.controlRadius = circleSize;
    opt.finishInnerRadius = circleSize * (5 / 6);
    opt.finishOuterRadius = circleSize * (7 / 6);
    opt.startTriangleLength = circleSize * (7 / 6);
    //opt.overprintWidth = this.options.courseWidth;
    opt.overprintWidth = 3;
    opt.purple = RG2.PURPLE;
    opt.fontSize = circleSize;
    return opt;
  }

  render() {
    if ((this.props.courses === undefined) || (this.props.map === null)) {
      return null;
    }
    const opt = this.getOverprintDetails(this.props.map);
    const courseOverprint = [];
    for (let i = 0; i < this.props.courses.length; i += 1) {
      if (this.props.courses[i].display) {
        courseOverprint.push(<SingleCourseOverprint key={i} course={this.props.courses[i]} opt={opt} />);
      }
    }
    return (
      <>
        {courseOverprint}
      </>
    );
  }
}

export default AllCoursesOverprint;

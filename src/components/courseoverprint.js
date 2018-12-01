import React, { Component } from 'react';
import Control from './control.js';
import Finish from './finish.js';
import Start from './start.js';
import { Line } from 'react-konva';
import RG2 from '../rg2Constants.js'

class CourseOverprint extends Component {
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
    opt.font = circleSize + 'pt Arial';
    return opt;
  }

  render() {
    if ((this.props.course === undefined) || (this.props.map === null)) {
      return null;
    }
    const opt = this.getOverprintDetails(this.props.map);
    const purple = RG2.PURPLE;
    let points = [];
    const course = this.props.course;
    const controlOverprint = [];
    controlOverprint.push(<Start key={0} x={course.xpos[0]} y={course.ypos[0]} radius={opt.controlRadius} color={purple} width={opt.overprintWidth} />);
    points = [course.xpos[0], course.ypos[0]];
    for (let i = 1; i < course.codes.length; i += 1) {
      if (i === course.codes.length - 1) {
        controlOverprint.push(<Finish key={i} x={course.xpos[i]} y={course.ypos[i]} radius={opt.controlRadius} color={purple} width={opt.overprintWidth} />);
      } else {
        controlOverprint.push(<Control key={i} x={course.xpos[i]} y={course.ypos[i]} radius={opt.controlRadius} color={purple} width={opt.overprintWidth} />);
      }
      // add x, y for this control to start of array
      points.unshift(course.xpos[i], course.ypos[i]);
      // draw connecting line
      controlOverprint.push(<Line key={i + 1000} points={points.slice()} stroke={purple} strokeWidth={opt.overprintWidth} />);
      // remove x, y for previous control from end of array
      points.splice(2, 2);
    }
    return (
      <>
        {controlOverprint}
      </>
    );
  }
}

export default CourseOverprint;

import React, { Component } from 'react';
import Control from './control.js';
import Finish from './finish.js';
import Start from './start.js';
import ControlNumber from './controlnumber.js';
import { Line } from 'react-konva';

class CourseOverprint extends Component {
  render() {
    let points = [];
    const course = this.props.course;
    const opt = this.props.opt;
    const controlOverprint = [];
    controlOverprint.push(<Start key={0} x={course.xpos[0]} y={course.ypos[0]} radius={opt.controlRadius} color={opt.purple} width={opt.overprintWidth} rotation={course.angle[0]} />);
    points = [course.xpos[0], course.ypos[0]];
    for (let i = 1; i < course.codes.length; i += 1) {
      if (i === course.codes.length - 1) {
        controlOverprint.push(<Finish key={i} x={course.xpos[i]} y={course.ypos[i]} radius={opt.controlRadius} color={opt.purple} width={opt.overprintWidth} />);
      } else {
        controlOverprint.push(<Control key={i} x={course.xpos[i]} y={course.ypos[i]} radius={opt.controlRadius} color={opt.purple} width={opt.overprintWidth} />);
      }
      // add x, y for this control to start of array
      points.unshift(course.xpos[i], course.ypos[i]);
      // draw connecting line
      controlOverprint.push(<Line key={i + 1000} points={points.slice()} stroke={opt.purple} strokeWidth={opt.overprintWidth} />);
      // remove x, y for previous control from end of array
      points.splice(2, 2);
      controlOverprint.push(<ControlNumber key={i + 2000} fontSize={opt.fontSize} text={i} x={course.xpos[i]} y={course.ypos[i]} color={opt.purple} width={opt.overprintWidth} />);
    }
    return (
      <>
        {controlOverprint}
      </>
    );
  }
}

export default CourseOverprint;

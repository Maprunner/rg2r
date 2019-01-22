import React, { Component } from 'react'
import Control from './Control.js'
import Finish from './Finish.js'
import Start from './Start.js'
import ControlNumber from './ControlNumber.js'
import { Line } from 'react-konva'
import { getDegreesFromRadians } from '../utils/rg2utils.js'
import RG2 from '../rg2Constants.js';

class CourseOverprint extends Component {
  //  TODO: move all this to a selector
  getPointsForLines(x, y, angle, opt) {
    // works out line ends so that they meet circles, start and finish
    let dist
    let points = []
    for (let i = 0; i < (x.length - 1); i += 1) {
      if (i === 0) {
        // push line back over white border of start triangle
        dist = (opt.circleSize * RG2.STARTSCALE) - opt.courseWidth
      } else {
        dist = opt.circleSize
      }
      points.push(x[i] + (dist * Math.cos(angle[i])))
      points.push(y[i] + (dist * Math.sin(angle[i])))
      //Assume the last control in the array is a finish
      if (i === x.length - 2) {
        dist = opt.circleSize * 7 / 6
      } else {
        dist = opt.circleSize
      }
      points.push(x[i + 1] - (dist * Math.cos(angle[i])))
      points.push(y[i + 1] - (dist * Math.sin(angle[i])))
    }
    return points
  }
  offsetControlText(x, y, angle, opt, code) {
    //metrics = rg2.ctx.measureText(code)
    // approximation for now
    let metrics = { width: code.length * opt.circleSize * 2 / 3 }
    // offset to left if left of centre, to right if right of centre
    let xoffset, yoffset
    if (angle < Math.PI) {
      xoffset = metrics.width / 2
    } else {
      xoffset = -1 * metrics.width / 2
    }
    // offset up if above half way, down if below half way
    if ((angle >= (Math.PI / 2)) && (angle <= (Math.PI * 1.5))) {
      yoffset = -1 * opt.circleSize
    } else {
      yoffset = opt.circleSize
    }
    // empirically looks OK with this scale factor
    let scale = 1.3
    return ({ x: x + (opt.circleSize * scale * Math.cos(angle)) + xoffset, y: y + (opt.circleSize * scale * Math.sin(angle)) + yoffset })

  }

  render() {
    const course = this.props.course
    const opt = this.props.opt
    const controlOverprint = []
    controlOverprint.push(<Start
      key={0}
      x={course.x[0]}
      y={course.y[0]}
      radius={opt.circleSize}
      width={opt.courseWidth}
      color={opt.color}
      rotation={getDegreesFromRadians(course.angle[0] + Math.PI / 3)} />)
    for (let i = 1; i < course.codes.length; i += 1) {
      if (i === course.codes.length - 1) {
        controlOverprint.push(<Finish
          key={i}
          x={course.x[i]}
          y={course.y[i]}
          width={opt.courseWidth}
          color={opt.color}
          radius={opt.circleSize}
        />)
      } else {
        controlOverprint.push(<Control
          key={i}
          x={course.x[i]}
          y={course.y[i]}
          radius={opt.circleSize}
          width={opt.courseWidth}
          color={opt.color} />)
      }
      // no number for finish
      if (i !== course.codes.length - 1) {
        let offSet = this.offsetControlText(course.x[i], course.y[i], course.textAngle[i], opt, i.toString())
        controlOverprint.push(<ControlNumber
          key={i + 2000}
          radius={opt.circleSize}
          color={opt.color}
          text={i}
          x={offSet.x}
          y={offSet.y} />)
      }
    }
    // draw connecting line if not a score course and we have more than a start and finish
    if ((!course.isScoreCourse) && (course.x.length > 2)) {
      const points = this.getPointsForLines(course.x, course.y, course.angle, opt)
      for (let i = 0; i < course.codes.length - 1; i += 1) {
        controlOverprint.push(<Line key={i + 1000} points={points.slice((4 * i), (4 * i) + 4)} stroke={opt.color} strokeWidth={opt.courseWidth} />)
      }
    }
    return (
      <>
        {controlOverprint}
      </>
    )
  }
}

export default CourseOverprint

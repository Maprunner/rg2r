import React, { memo } from 'react'
import Control from './Control.js'
import Finish from './Finish.js'
import Start from './Start.js'
import ControlNumber from './ControlNumber.js'

function AllControlsOverprint(props) {
  const { controls, opt } = props
  if (controls.length === 0) {
    return null
  }
  const controlsOverprint = []
  for (let i = 0; i < controls.length; i += 1) {
    // Assume things starting with 'F' or 'M' are Finish or Mal
    if ((controls[i].code.indexOf('F') === 0) || (controls[i].code.indexOf('M') === 0)) {
      controlsOverprint.push(<Finish
        key={i}
        x={controls[i].x}
        y={controls[i].y}
        width={opt.courseWidth}
        color={opt.color}
        radius={opt.circleSize}
      />)
    } else {
      // Assume things starting with 'S' are a Start
      if (controls[i].code.indexOf('S') === 0) {
        controlsOverprint.push(<Start
          key={i}
          x={controls[i].x}
          y={controls[i].y}
          radius={opt.circleSize}
          width={opt.courseWidth}
          color={opt.color}
          rotation={0} />)
      } else {
        // Else it's a normal control
        controlsOverprint.push(<Control
          key={i}
          x={controls[i].x}
          y={controls[i].y}
          radius={opt.circleSize}
          width={opt.courseWidth}
          color={opt.color} />)
        // TODO Draw dots
        //if (drawDot) {
        //  rg2.ctx.fillRect(controls[i].x - 1, controls[i].y - 1, 3, 3);
        //}
      }
    }
    controlsOverprint.push(<ControlNumber
      key={i + 2000}
      radius={opt.circleSize}
      color={opt.color}
      code={controls[i].code}
      angle={-1 * Math.PI / 4}
      x={controls[i].x}
      y={controls[i].y} />)
  }

  return (
    <>
      {controlsOverprint}
    </>
  )
}

export default memo(AllControlsOverprint)

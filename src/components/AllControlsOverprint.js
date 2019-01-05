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
        width={opt.width}
        color={opt.color}
        finishOuterRadius={opt.finishOuterRadius}
        finishInnerRadius={opt.finishInnerRadius}
      />)
    } else {
      // Assume things starting with 'S' are a Start
      if (controls[i].code.indexOf('S') === 0) {
        controlsOverprint.push(<Start
          key={i}
          x={controls[i].x}
          y={controls[i].y}
          radius={opt.radius}
          width={opt.width}
          color={opt.color}
          rotation={0} />)
      } else {
        // Else it's a normal control
        controlsOverprint.push(<Control
          key={i}
          x={controls[i].x}
          y={controls[i].y}
          radius={opt.radius}
          width={opt.width}
          color={opt.color} />)
        // TODO Draw dots
        //if (drawDot) {
        //  rg2.ctx.fillRect(controls[i].x - 1, controls[i].y - 1, 3, 3);
        //}
      }
    }
    controlsOverprint.push(<ControlNumber
      key={i + 2000}
      fontSize={opt.fontSize}
      color={opt.color}
      text={controls[i].code}
      x={controls[i].x + opt.radius + 10}
      y={controls[i].y - opt.radius - 10} />)
  }

  return (
    <>
      {controlsOverprint}
    </>
  )
}

export default memo(AllControlsOverprint)

import React from 'react'
import { Circle } from 'react-konva'


const Finish = ({ x, y, opt }) => (
  <>
    <Circle
      x={x}
      y={y}
      radius={opt.finishInnerRadius}
      stroke={"white"}
      strokeWidth={opt.width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={opt.finishOuterRadius}
      stroke={"white"}
      strokeWidth={opt.width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={opt.finishInnerRadius}
      stroke={opt.color}
      strokeWidth={opt.width}
    />
    <Circle
      x={x}
      y={y}
      radius={opt.finishOuterRadius}
      stroke={opt.color}
      strokeWidth={opt.width}
    />
  </>
)

export default Finish

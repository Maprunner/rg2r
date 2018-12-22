import React from 'react'
import { Circle } from 'react-konva'

const Control = ({ x, y, opt }) => (
  <>
    <Circle
      x={x}
      y={y}
      radius={opt.radius}
      stroke={"white"}
      strokeWidth={opt.width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={opt.radius}
      stroke={opt.color}
      strokeWidth={opt.width}
    />
  </>
)

export default Control

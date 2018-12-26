import React, { memo } from 'react'
import { Circle } from 'react-konva'


const Finish = ({ x, y, width, color,  finishInnerRadius, finishOuterRadius}) => (
  <>
    <Circle
      x={x}
      y={y}
      radius={finishInnerRadius}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={finishOuterRadius}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={finishInnerRadius}
      stroke={color}
      strokeWidth={width}
    />
    <Circle
      x={x}
      y={y}
      radius={finishOuterRadius}
      stroke={color}
      strokeWidth={width}
    />
  </>
)

export default memo(Finish)

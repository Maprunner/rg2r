import React, { memo } from 'react'
import { Circle } from 'react-konva'
import RG2 from '../rg2Constants'

const Finish = ({ x, y, width, color, radius }) => (
  <>
    <Circle
      x={x}
      y={y}
      radius={radius * RG2.FINISHINNERSCALE}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={radius * RG2.FINISHOUTERSCALE}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={radius * RG2.FINISHINNERSCALE}
      stroke={color}
      strokeWidth={width}
    />
    <Circle
      x={x}
      y={y}
      radius={radius * RG2.FINISHOUTERSCALE}
      stroke={color}
      strokeWidth={width}
    />
  </>
)

export default memo(Finish)

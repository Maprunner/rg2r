import React, { memo } from 'react'
import { RegularPolygon } from 'react-konva'

const Start = ({ x, y, radius, width, color, rotation }) => (
  <>
    <RegularPolygon
      x={x}
      y={y}
      sides={3}
      radius={radius}
      rotation={rotation}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <RegularPolygon
      x={x}
      y={y}
      sides={3}
      radius={radius}
      rotation={rotation}
      stroke={color}
      strokeWidth={width}
    />
  </>
)

export default memo(Start)

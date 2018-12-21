import React from 'react'
import { RegularPolygon } from 'react-konva'

const Start = ({ x, y, opt, rotation }) => (
  <>
    <RegularPolygon
      x={x}
      y={y}
      sides={3}
      radius={opt.radius}
      rotation={rotation}
      stroke={"white"}
      strokeWidth={opt.width + 2}
    />
    <RegularPolygon
      x={x}
      y={y}
      sides={3}
      radius={opt.radius}
      rotation={rotation}
      stroke={opt.color}
      strokeWidth={opt.width}
    />
  </>
)

export default Start

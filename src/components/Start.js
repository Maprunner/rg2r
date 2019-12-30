import React, { memo } from 'react'
import { RegularPolygon } from 'react-konva'
import RG2 from '../rg2Constants';

const Start = ({ x, y, radius, width, color, rotation }) => (
  <>
    <RegularPolygon
      x={x}
      y={y}
      sides={3}
      radius={radius * RG2.STARTSCALE}
      rotation={rotation}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <RegularPolygon
      x={x}
      y={y}
      sides={3}
      radius={radius * RG2.STARTSCALE}
      rotation={rotation}
      stroke={color}
      strokeWidth={width}
    />
  </>
)

export default memo(Start)

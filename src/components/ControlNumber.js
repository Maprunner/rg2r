import React, { memo } from 'react'
import { Text } from 'react-konva'

const fontScale = 1.5
const ControlNumber = ({ x, y, radius, color, text }) => (
  <>
    <Text
      text={text}
      fontSize={radius * fontScale}
      fontStyle={"bold"}
      x={x}
      y={y}
      stroke={"white"}
      fill={color}
      strokeWidth={0.5}
      align={"center"}
      textAlign={"middle"}
    />
  </>
)

export default memo(ControlNumber)

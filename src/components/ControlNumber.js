import React , { memo } from 'react'
import { Text } from 'react-konva'

const ControlNumber = ({ x, y, fontSize, color, text }) => (
  <>
    <Text
      text={text}
      fontSize={fontSize}
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

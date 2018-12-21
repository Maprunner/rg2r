import React from 'react'
import { Text } from 'react-konva'

const ControlNumber = ({ x, y, opt, text }) => (
  <>
    <Text
      text={text}
      fontSize={opt.fontSize}
      fontStyle={"bold"}
      x={x}
      y={y}
      stroke={"white"}
      fill={opt.color}
      strokeWidth={0.5}
      align={"center"}
      textAlign={"middle"}
    />
  </>
)

export default ControlNumber

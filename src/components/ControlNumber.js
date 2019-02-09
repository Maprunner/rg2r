import React, { memo } from 'react'
import { Text } from 'react-konva'

function offsetControlText(x, y, angle, radius, code) {
  // TODO move to reducer/selector
  //metrics = rg2.ctx.measureText(code)
  // approximation for now
  let width = code.length * radius
  let xoffset, yoffset
  // Text (x,y) is top left of text
  // offset up by text height if above centre
  if (angle >= 0) {
    yoffset = 0
  } else {
    yoffset = -1 * radius
  }
  // offset left by text width if left of centre
  if (Math.abs(angle) > (Math.PI / 2)) {
    xoffset = -1 * width
  } else {
    xoffset = 0
  }
  // empirically looks OK with this scale factor
  let scale = 1.2
  return { x: x + ((radius * scale * Math.cos(angle)) + xoffset), y: y + ((radius * scale * Math.sin(angle)) + yoffset) }
}

const fontScale = 1.5
function ControlNumber(props) {
  const { x, y, angle, radius, color, code } = props
  let offset = offsetControlText(x, y, angle, radius, code.toString())
  return (
    <Text
      text={code}
      fontFamily="monospace"
      fontSize={radius * fontScale}
      fontStyle={"bold"}
      x={offset.x}
      y={offset.y}
      stroke={"white"}
      fill={color}
      strokeWidth={0.5}
      align={"center"}
      verticalAlign={"middle"}
    />
  )
}

export default memo(ControlNumber)

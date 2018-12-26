import React, {memo} from 'react'
import { Line } from 'react-konva'

function SingleRoute(props) {
  const { points, colour, width } = props
  return (
    <Line points={points} stroke={colour} strokeWidth={width} />
  )
  }

export default memo(SingleRoute)

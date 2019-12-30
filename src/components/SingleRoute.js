import React, { memo } from 'react'
import { Line } from 'react-konva'

function SingleRoute(props) {
  const { points, colour, width, intensity } = props
  return (
    <Line points={points} stroke={colour} strokeWidth={width} opacity={intensity / 100} />
  )
}

export default memo(SingleRoute)

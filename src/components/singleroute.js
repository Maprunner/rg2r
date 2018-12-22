import React from 'react'
import { Line } from 'react-konva'

const SingleRoute = ({ points, colour, width }) => (
  <Line points={points} stroke={colour} strokeWidth={width} />
)

export default SingleRoute

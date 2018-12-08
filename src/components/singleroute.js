import React from 'react';
import { Line } from 'react-konva';

const SingleRoute = ({ points, colour }) => (
  <Line points={points} stroke={colour} strokeWidth={3} />
)

export default SingleRoute;

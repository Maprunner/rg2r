import React from 'react';
import { Line } from 'react-konva';

const SingleRunner = ({ points, colour }) => (
  <Line points={points} stroke={colour} strokeWidth={3} />
)

export default SingleRunner;

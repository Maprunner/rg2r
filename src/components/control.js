import React from 'react';
import { Circle } from 'react-konva';

const Control = ({ x, y, radius, color, width }) => (
  <>
    <Circle
      x={x}
      y={y}
      radius={radius}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={radius}
      stroke={color}
      strokeWidth={width}
    />
  </>
)

export default Control;

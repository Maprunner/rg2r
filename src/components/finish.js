import React from 'react';
import { Circle } from 'react-konva';


const Finish = ({ x, y, radius, color, width }) => (
  <>
    <Circle
      y={y}
      x={x}
      radius={radius + 5}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Circle
      x={x}
      y={y}
      radius={radius}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Circle
      y={y}
      x={x}
      radius={radius + 5}
      stroke={color}
      strokeWidth={width}
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

export default Finish;

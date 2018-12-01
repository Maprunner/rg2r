import React from 'react';
import { Text } from 'react-konva';

const ControlNumber = ({ x, y, color, width, text, fontSize }) => (
  <>
    <Text
      text={text}
      fontSize={fontSize}
      x={x + 20}
      y={y}
      stroke={"white"}
      strokeWidth={width + 2}
    />
    <Text
      text={text}
      fontSize={fontSize}
      x={x + 20}
      y={y}
      stroke={color}
      strokeWidth={width}
    />
  </>
)

export default ControlNumber;

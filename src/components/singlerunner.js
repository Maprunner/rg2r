import React, { memo } from 'react'
import { Text, Arrow } from 'react-konva'

class SingleRunner extends React.PureComponent {
  render() {
    const { points, colour, name } = this.props
    if (points.length === 0) {
      return null
    }
    let lasty = points.length - 1
    let lastx = lasty - 1
    return (
      <>
        <Arrow
          points={points}
          fill={colour}
          stroke={colour}
          strokeWidth={3} />
        <Text
          text={name}
          x={points[lastx] + 10}
          y={points[lasty] + 10}
          fontSize={12}
          fill={"black"}
          strokeWidth={1}
        />
      </>
    )
  }
}

export default memo(SingleRunner)

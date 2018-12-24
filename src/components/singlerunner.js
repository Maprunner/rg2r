import React from 'react'
import { Line } from 'react-konva'

class SingleRunner extends React.PureComponent {
  render() {
    const { points, colour } = this.props
    return (
      <Line points={points} stroke={colour} strokeWidth={3} />
    )
  }
}

export default SingleRunner

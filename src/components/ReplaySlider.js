import React, { memo } from 'react'
import { Slider } from 'primereact/slider'

function ReplaySlider(props) {
  const { time, onSetTime, minTime, maxTime } = props
  return (
<   Slider
      value={time}
      onChange={onSetTime}
      min={minTime}
      max={maxTime}
      style={{ width: '20em' }} />
  )
}

export default memo(ReplaySlider)
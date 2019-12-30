import React, { memo } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

function ReplaySlider(props) {
  const { time, onSetTime, minTime, maxTime } = props
  return (
    <div className="p-1 slider" style={{ width: '220px' }}>
      <Slider
        min={minTime}
        max={maxTime}
        value={time}
        onChange={onSetTime}
      />
    </div>
  )
}

export default memo(ReplaySlider)
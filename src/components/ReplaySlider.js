import React, { memo } from 'react'

function ReplaySlider(props) {
  const { time, onSetTime, minTime, maxTime } = props
  return (
    <div className="p-1">
      <input
        type="range"
        id="replay-speed"
        min={minTime}
        max={maxTime}
        value={time}
        onChange={onSetTime} />
    </div>
  )
}

export default memo(ReplaySlider)
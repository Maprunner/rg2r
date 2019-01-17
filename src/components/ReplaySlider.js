import React, { memo } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

function ReplaySlider(props) {
  const { time, onSetTime, minTime, maxTime } = props
  return (
    <div className="p-1 slider" style={{ width: '200px' }}>
      {/* <input
        type="range"
        id="replay-speed"
        min={minTime}
        max={maxTime}
        value={time}
        onChange={onSetTime} /> */}
      <Slider
        min={minTime}
        max={maxTime}
        value={time}
        onChange={onSetTime}
      // onChangeStart={this.handleChangeStart}
      // onChangeComplete={this.handleChangeComplete}
      />
    </div>
  )
}

export default memo(ReplaySlider)
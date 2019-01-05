import React, { memo } from 'react'
import Card from 'react-bootstrap/lib/Card'
import ReplayButton from './ReplayButton.js'
import ReplaySpeed from './ReplaySpeed.js'
import ReplaySlider from './ReplaySlider.js'
import ReplayModeButton from './ReplayModeButton.js'
import Utils from '../utils/rg2utils.js'

function ReplayPanel(props) {
  const { animation, runnerCount, onStartStop, onSetReplayMode, onSetTime, onSetSpeed } = props
  if (runnerCount === 0) {
    return null
  }
  let maxTime
  let minTime
  if (animation.realTime) {
    maxTime = animation.latestFinishSecs
    minTime = animation.earliestStartSecs
  } else {
    maxTime = animation.slowestTimeSecs
    minTime = 0
  }
  return (
    <Card id={"replay"}>
      <div className="d-flex p-1">
        <ReplayButton running={animation.timerRunning} onStartStop={onStartStop} />
        <ReplayModeButton realTime={animation.realTime} onSetReplayMode={onSetReplayMode} />
        <ReplaySpeed timerIncrement={animation.timerIncrement} onSetSpeed={onSetSpeed} />
        <div className='p-1'>
          {Utils.formatSecsAsHHMMSS(animation.time)}
        </div>
        <ReplaySlider
          time={animation.time}
          onSetTime={onSetTime}
          minTime={minTime}
          maxTime={maxTime} />
      </div>
    </Card>
  )
}

export default memo(ReplayPanel)

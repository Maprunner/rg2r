import React, { memo } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ReplayButton from './ReplayButton.js'
import ReplaySpeed from './ReplaySpeed.js'
import ReplaySlider from './ReplaySlider.js'
import ReplayModeButton from './ReplayModeButton.js'
import { formatSecsAsHHMMSS } from '../utils/rg2utils.js'

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
    <Card id={"replay"} className="container">
      <div className="row">
        <Col sm={1}>
          <ReplayButton running={animation.timerRunning} onStartStop={onStartStop} />
        </Col>
        <Col sm={3} className='pt-2 px-0'>
          <h2>{formatSecsAsHHMMSS(animation.time)}</h2>
        </Col>
        <Col sm={1}>
          <ReplayModeButton realTime={animation.realTime} onSetReplayMode={onSetReplayMode} />
        </Col>
        <Col sm={2} className='pr-0 py-2 float-right'>
          <ReplaySpeed timerIncrement={animation.timerIncrement} onSetSpeed={onSetSpeed} />
        </Col>
        <Col sm={5}>
          <ReplaySlider
            time={animation.time}
            onSetTime={onSetTime}
            minTime={minTime}
            maxTime={maxTime} />
        </Col>
      </div>
    </Card >
  )
}

export default memo(ReplayPanel)

import React from 'react'
import Card from 'react-bootstrap/lib/Card'
import Form from 'react-bootstrap/lib/Form'
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
    <Form inline>
      {/* <Form.Group controlId="formSearch">
        <Form.Control type="search" value="A" />
        <Form.Text />
      </Form.Group> */}
      <ReplayButton animation={animation} onStartStop={onStartStop} />
      <ReplayModeButton realTime={animation.realTime} onSetReplayMode={onSetReplayMode} />
      <ReplaySpeed timerIncrement={animation.timerIncrement} onSetSpeed={onSetSpeed} />
      <ReplaySlider
                time={animation.time}
                onSetTime={onSetTime}
                minTime={minTime}
                maxTime={maxTime} />
      {Utils.formatSecsAsHHMMSS(animation.time)}
    </Form>
    </Card>
  )
}

export default ReplayPanel

import React from 'react'
import { Panel } from 'primereact/panel'
import ReplayButton from './ReplayButton.js'
import ReplaySpeed from './ReplaySpeed.js'
import ReplaySlider from './ReplaySlider.js'
import ReplayModeButton from './ReplayModeButton.js'
import Utils from '../utils/rg2utils.js'

function ReplayPanel(props) {
  if (props.runnerCount === 0) {
    return null
  }
  let maxTime
  let minTime
  if (props.animation.realTime) {
    maxTime = props.animation.latestFinishSecs
    minTime = props.animation.earliestStartSecs
  } else {
    maxTime = props.animation.slowestTimeSecs
    minTime = 0
  }
  return (
    <Panel id={"replay"}>
    <table>
      <tbody>
      <tr>
        <td>
          <ReplayButton animation={props.animation} onStartStop={props.onStartStop} />
        </td>
        <td>
          <ReplayModeButton realTime={props.animation.realTime} onChangeReplayMode={props.onChangeReplayMode} />
          </td>
          <td>
      <ReplaySlider
        time={props.animation.time}
        onSetTime={props.onSetTime}
        minTime={minTime}
        maxTime={maxTime} />
      </td>
      <td>
      <ReplaySpeed timerIncrement={props.animation.timerIncrement} onSetSpeed={props.onSetSpeed} />
      {Utils.formatSecsAsHHMMSS(props.animation.time)}
      </td>
      </tr>
      </tbody>
      </table>
    </Panel>
  )
}

export default ReplayPanel

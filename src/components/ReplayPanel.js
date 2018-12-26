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
  if (props.replay.realTime) {
    maxTime = props.replay.latestFinishSecs
    minTime = props.replay.earliestStartSecs
  } else {
    maxTime = props.replay.slowestTimeSecs
    minTime = 0
  }
  return (
    <Panel id={"replay"}>
    <table>
      <tbody>
      <tr>
        <td>
          <ReplayButton replay={props.replay} onStartStop={props.onStartStop} />
        </td>
        <td>
          <ReplayModeButton realTime={props.replay.realTime} onChangeReplayMode={props.onChangeReplayMode} />
          </td>
          <td>
      <ReplaySlider
        time={props.replay.time}
        onSetTime={props.onSetTime}
        minTime={minTime}
        maxTime={maxTime} />
      </td>
      <td>
      <ReplaySpeed timerIncrement={props.replay.timerIncrement} onSetSpeed={props.onSetSpeed} />
      {Utils.formatSecsAsHHMMSS(props.replay.time)}
      </td>
      </tr>
      </tbody>
      </table>
    </Panel>
  )
}

export default ReplayPanel

import React from 'react'
import { Panel } from 'primereact/panel'
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
    <Panel id={"replay"}>
      <table>
        <tbody>
          <tr>
            <td>
              <ReplayButton animation={animation} onStartStop={onStartStop} />
            </td>
            <td>
              <ReplayModeButton realTime={animation.realTime} onSetReplayMode={onSetReplayMode} />
            </td>
            <td>
              <ReplaySlider
                time={animation.time}
                onSetTime={onSetTime}
                minTime={minTime}
                maxTime={maxTime} />
            </td>
            <td>
              <ReplaySpeed timerIncrement={animation.timerIncrement} onSetSpeed={onSetSpeed} />
              {Utils.formatSecsAsHHMMSS(animation.time)}
            </td>
          </tr>
        </tbody>
      </table>
    </Panel>
  )
}

export default ReplayPanel

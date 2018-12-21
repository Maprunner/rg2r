import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReplayButton(props) {
  let icon = props.replay.timerRunning ? 'pause' : 'play'
  return (
    <div>
      <FontAwesomeIcon icon={icon} size={"lg"} onClick={props.onStartStop} />
    </div>
  )
}

export default ReplayButton
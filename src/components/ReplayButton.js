import React,{ memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReplayButton(props) {
  const {timerRunning, onStartStop} = props
  let icon = timerRunning ? 'pause' : 'play'
  return (
    <div className='p-1'>
      <FontAwesomeIcon fixedWidth icon={icon} size={"lg"} onClick={onStartStop} />
    </div>
  )
}

export default memo(ReplayButton)
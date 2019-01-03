import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReplayModeButton(props) {
  const { realTime, onSetReplayMode } = props
  let icon = realTime ? 'clock' : 'users'
  return (    
    <div className='p-1'>
      <FontAwesomeIcon fixedWidth icon={icon} size={"lg"} onClick={onSetReplayMode} />
    </div>
   )
}

export default memo(ReplayModeButton)
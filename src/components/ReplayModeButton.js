import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReplayModeButton(props) {
  const { realTime, onSetReplayMode } = props
  return (
    <div className='pt-3'>
      <FontAwesomeIcon fixedWidth icon={realTime ? 'clock' : 'users'} size={"lg"} onClick={onSetReplayMode} />
    </div>
  )
}

export default memo(ReplayModeButton)
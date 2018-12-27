import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReplayModeButton(props) {
  const { realTime, onSetReplayMode } = props
  let icon = realTime ? 'clock' : 'users'
  return (
    <FontAwesomeIcon icon={icon} size={"lg"} onClick={onSetReplayMode} />
  )
}

export default memo(ReplayModeButton)
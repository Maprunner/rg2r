import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReplayButton(props) {
  const { running, onStartStop } = props
  return (
    <div className='pt-3'>
      <FontAwesomeIcon fixedWidth icon={running ? 'pause' : 'play'} size={"lg"} onClick={onStartStop} />
    </div>
  )
}

export default memo(ReplayButton)
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ReplayModeButton(props) {
  let icon = props.realTime ? 'clock' : 'users';
  return (
    <div>
      <FontAwesomeIcon icon={icon} size={"lg"} onClick={props.onChangeReplayMode} />
    </div>
  );
}

export default ReplayModeButton;
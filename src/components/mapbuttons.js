import React from 'react';
import { Button } from 'primereact/button';
import ReplayPanel from './replaypanel.js';

const MapButtons = (props) => (
  <>
    <div id={"zoom-in"}>
      <Button icon="pi pi-plus" onClick={props.onZoomIn} disabled={!props.mapLoaded} />
    </div>
    <div id={"zoom-out"}>
      <Button icon="pi pi-minus" onClick={props.onZoomOut} disabled={!props.mapLoaded} />
    </div>
    <ReplayPanel
      replay={props.replay}
      onStartStop={props.onStartStop}
      onSetSpeed={props.onSetSpeed}
      onChangeTime={props.onChangeTime}
      onChangeReplayMode={props.onChangeReplayMode}
      runnerCount={props.runnerCount} />
  </>
)

export default MapButtons;

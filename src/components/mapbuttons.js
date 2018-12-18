import React from 'react';
import { Button } from 'primereact/button';
import ReplayPanel from './ReplayPanel.js';

const MapButtons = (props) => (
  <>
    <div id={"zoom-in"}>
      <Button icon="pi pi-plus" onClick={() => props.onZoom(true)} disabled={!props.mapLoaded} />
    </div>
    <div id={"zoom-out"}>
      <Button icon="pi pi-minus" onClick={() => props.onZoom(false)} disabled={!props.mapLoaded} />
    </div>
    <ReplayPanel
      replay={props.replay}
      onStartStop={props.onStartStop}
      onSetSpeed={props.onSetSpeed}
      onSetTime={props.onSetTime}
      onSetReplayMode={props.onSetReplayMode}
      runnerCount={props.runnerCount} />
  </>
)

export default MapButtons;

import React from 'react';
import { Button } from 'primereact/button';
import ReplayPanel from './replaypanel.js';

const MapButtons = ({ mapLoaded, onStartStop, onZoomIn, onZoomOut }) => (
  <>
    <div id={"zoom-in"}>
      <Button icon="pi pi-plus" onClick={onZoomIn} disabled={!mapLoaded} />
    </div>
    <div id={"zoom-out"}>
      <Button icon="pi pi-minus" onClick={onZoomOut} disabled={!mapLoaded} />
    </div>
    <ReplayPanel onStartStop={onStartStop} />
  </>
)

export default MapButtons;

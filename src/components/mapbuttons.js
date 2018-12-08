import React from 'react';
import { Button } from 'primereact/button';

const MapButtons = ({ mapLoaded, onZoomIn, onZoomOut }) => (
  <>
    <div id={"zoom-in"}>
      <Button icon="pi pi-plus" onClick={onZoomIn} disabled={mapLoaded ? "" : "disabled"} />
    </div>
    <div id={"zoom-out"}>
      <Button icon="pi pi-minus" onClick={onZoomOut} />
    </div>
  </>
)

export default MapButtons;

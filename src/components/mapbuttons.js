import React from 'react'
import { Button } from 'primereact/button'

const MapButtons = (props) => (
  <>
    <div id={"zoom-in"}>
      <Button icon="pi pi-plus" onClick={() => props.onZoom(true)} disabled={!props.mapLoaded} />
    </div>
    <div id={"zoom-out"}>
      <Button icon="pi pi-minus" onClick={() => props.onZoom(false)} disabled={!props.mapLoaded} />
    </div>
  </>
)

export default MapButtons

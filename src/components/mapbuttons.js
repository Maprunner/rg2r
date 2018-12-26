import React, { memo } from 'react'
import { Button } from 'primereact/button'

function MapButtons(props) {
  const {mapLoaded, onZoom} = props
  return (
  <>
    <div id={"zoom-in"}>
      <Button icon="pi pi-plus" onClick={() => onZoom(true)} disabled={!mapLoaded} />
    </div>
    <div id={"zoom-out"}>
      <Button icon="pi pi-minus" onClick={() => props.onZoom(false)} disabled={!mapLoaded} />
    </div>
  </>
  )
  }

export default memo(MapButtons)

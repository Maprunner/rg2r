import React, { memo } from 'react'
import Button from 'react-bootstrap/lib/Button'

function MapButtons(props) {
  const {mapLoaded, onZoom} = props
  return (
  <>
    <div id={"zoom-in"}>
      <Button onClick={() => onZoom(true)} disabled={!mapLoaded}>+</Button>
    </div>
    <div id={"zoom-out"}>
      <Button onClick={() => props.onZoom(false)} disabled={!mapLoaded}>-</Button>
    </div>
  </>
  )
  }

export default memo(MapButtons)

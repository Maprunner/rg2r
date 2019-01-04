import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MapButtons(props) {
  const { mapLoaded, onZoom, onRotate, onResetMap } = props
  let color
  mapLoaded ? color = "black" : color = "gray"
  return (
    <div id="zoom-controls" className="d-flex flex-column">
      <div className="d-flex justify-content-center">
        <span className="p-1"><FontAwesomeIcon icon={'plus-square'} size="sm" color={color} onClick={() => onZoom(true)} /></span>
      </div>
      <div className="d-flex justify-content-center">
        <span className="p-1"><FontAwesomeIcon icon={'redo-alt'} size="sm" color={color} onClick={() => onRotate(true)} /></span>
        <span className="p-1"><FontAwesomeIcon icon={'sync-alt'} size="sm" color={color} onClick={() => onResetMap()} /></span>
        <span className="p-1"><FontAwesomeIcon icon={'undo-alt'} size="sm" color={color} onClick={() => onRotate(false)} /></span>
      </div>
      <div className="d-flex justify-content-center">
        <span className="p-1"><FontAwesomeIcon icon={'minus-square'} size="sm" color={color} onClick={() => onZoom(false)} /></span>
      </div>

    </div>
  )
}

export default memo(MapButtons)

import update from 'immutability-helper';

const initialState = {
  mapImage: null,
  width: window.innerWidth,
  height: window.innerHeight - 36,
  zoom: { x: 1, y: 1 },
  x: 360,
  y: 0
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case 'MAP_LOADED':
      return update(state, {
        mapImage: { $set: action.image }
      });
    case 'SCREEN_RESIZED':
      return update(state, {
        zoom: { $set: { x: 1, y: 1 } },
        width: { $set: action.width },
        height: { $set: action.height }
      });
    case 'ZOOM':
      let zoom = doZoom(state.zoom, action.zoomIn)
      return update(state, {
        zoom: { $set: zoom }
      });
    case 'SCROLL':
      let updated = handleScroll(action.delta, action.mousePos, action.zoom, action.xy)
      if (updated.ok) {
        return update(state, {
          zoom: { $set: updated.zoom },
          x: { $set: updated.x },
          y: { $set: updated.y }
        })
      } else {
        return state
      }
    default:
      return state
  }
}

function doZoom(currentZoom, zoomIn) {
  let zoom
  if (zoomIn) {
    zoom = { x: currentZoom.x * 1.2, y: currentZoom.y * 1.2 }
  } else {
    zoom = { x: currentZoom.x / 1.2, y: currentZoom.y / 1.2 }
  }
  return zoom
}

function handleScroll(delta, mousePos, zoom, xy) {
  const factor = Math.pow(1.1, delta);
  // assuming same zoom factor for x and y
  let newZoom = zoom.x * factor;
  // limit zoom to avoid things disappearing
  // chosen values seem reasonable after some quick tests
  if (isNaN(newZoom)) {
    newZoom = { x: 1, y: 1 }
  }
  if ((newZoom < 50) && (newZoom > 0.05)) {
    const mousePointTo = {
      x: mousePos.x / zoom.x - xy.x / zoom.x,
      y: mousePos.y / zoom.y - xy.y / zoom.y
    }
    return ({
      zoom: { x: newZoom, y: newZoom },
      x: -(mousePointTo.x - mousePos.x / newZoom) * newZoom,
      y: -(mousePointTo.y - mousePos.y / newZoom) * newZoom,
      ok: true
    })
  }
  return ({ ok: false })
}

export default map;
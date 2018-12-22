import update from 'immutability-helper'
import RG2 from '../rg2Constants.js'

const initialState = {
  mapImage: null,
  width: window.innerWidth,
  height: window.innerHeight - RG2.TOOLBAR_HEIGHT,
  zoom: { x: 1, y: 1 },
  x: 360,
  y: 0,
  // ratios based on IOF ISOM overprint specification
  opt: {
    width: 3,
    radius: getRadius(window.innerHeight - RG2.TOOLBAR_HEIGHT, window.innerWidth),
    finishInnerRadius: getRadius(window.innerHeight - RG2.TOOLBAR_HEIGHT, window.innerWidth) * (5 / 6),
    finishOuterRadius: getRadius(window.innerHeight - RG2.TOOLBAR_HEIGHT, window.innerWidth) * (7 / 6),
    startTriangleLength: getRadius(window.innerHeight - RG2.TOOLBAR_HEIGHT, window.innerWidth) * (7 / 6),
    color: RG2.PURPLE,
    fontSize: getRadius(window.innerHeight - RG2.TOOLBAR_HEIGHT, window.innerWidth) * 1.5
  }
}

function getRadius(height, width) {
  // attempt to scale overprint depending on map image size
  // this avoids very small/large circles, or at least makes things a bit more sensible
  // Empirically derived  so open to suggestions. This is based on a nominal 20px circle
  // as default. The square root stops things getting too big too quickly.
  // 1500px is a typical map image maximum size.
  let scaleFact = Math.pow(Math.min(height, width) / 1500, 0.5)
  // don't get too carried away, although these would be strange map files
  scaleFact = Math.min(scaleFact, 5)
  scaleFact = Math.max(scaleFact, 0.5)
  //circleSize = Math.round(rg2.options.circleSize * scaleFact)
  return Math.round(20 * scaleFact)
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case 'MAP_LOADED':
      return update(state, {
        mapImage: { $set: action.image }
      })
    case 'EVENT_REQUESTED':
      return initialState
    case 'SCREEN_RESIZED':
      return update(state, {
        zoom: { $set: { x: 1, y: 1 } },
        width: { $set: action.width },
        height: { $set: action.height }
      })
    case 'ZOOM':
      let zoom = doZoom(state.zoom, action.zoomIn)
      return update(state, {
        zoom: { $set: zoom }
      })
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
  const factor = Math.pow(1.1, delta)
  // assuming same zoom factor for x and y
  let newZoom = zoom.x * factor
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

export default map
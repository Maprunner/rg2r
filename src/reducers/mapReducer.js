import update from 'immutability-helper'
import RG2 from '../rg2Constants.js'

const initialState = {
  mapImage: null,
  width: window.innerWidth,
  height: window.innerHeight - RG2.TOOLBAR_HEIGHT,
  zoom: { x: 1, y: 1 },
  angle: 0,
  x: RG2.INFO_BAR_WIDTH,
  y: 0,
  // ratios based on IOF ISOM overprint specification
  // don't change these names since they are used in LocalStorage
  opt: {
    alignMap: false,
    mapIntensity: 100,
    routeIntensity: 100,
    circleSize: 20,
    // TODO? circleSize: getRadius(window.innerHeight - RG2.TOOLBAR_HEIGHT, window.innerWidth),
    courseWidth: 3,
    routeWidth: 3,
    color: RG2.PURPLE,
    replayFontSize: 12,
    snap: true,
    showGPSSpeed: false,
    showThreeSeconds: false
  }
}

// function getRadius(height, width) {
//   // attempt to scale overprint depending on map image size
//   // this avoids very small/large circles, or at least makes things a bit more sensible
//   // Empirically derived  so open to suggestions. This is based on a nominal 20px circle
//   // as default. The square root stops things getting too big too quickly.
//   // 1500px is a typical map image maximum size.
//   let scaleFact = Math.pow(Math.min(height, width) / 1500, 0.5)
//   // don't get too carried away, although these would be strange map files
//   scaleFact = Math.min(scaleFact, 5)
//   scaleFact = Math.max(scaleFact, 0.5)
//   //circleSize = Math.round(rg2.options.circleSize * scaleFact)
//   return Math.round(20 * scaleFact)
// }

const map = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALISE_OPTIONS':
      return update(state, {
        opt: { $merge: action.options }
      })
    case 'MAP_LOADED':
      return update(state, {
        mapImage: { $set: action.image }
      })
    case 'RESET_MAP':
      return update(state, {
        angle: { $set: 0 },
        zoom: { $set: { x: 1, y: 1 } },
        x: { $set: RG2.INFO_BAR_WIDTH },
        y: { $set: 0 }
      })
    case 'ROTATE_MAP':
      let angle = rotateMap(state.angle, action.clockwise)
      return update(state, {
        angle: { $set: angle }
      })
    case 'SCREEN_RESIZED':
      return update(state, {
        zoom: { $set: { x: 1, y: 1 } },
        width: { $set: action.width },
        height: { $set: action.height }
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
    case 'SET_CIRCLE_SIZE':
      return update(state, {
        opt: { circleSize: { $set: action.size } }
      })
    case 'SET_COURSE_WIDTH':
      return update(state, {
        opt: { courseWidth: { $set: action.width } }
      })
    case 'SET_MAP_INTENSITY':
      return update(state, {
        opt: { mapIntensity: { $set: action.intensity } }
      })
    case 'SET_ROUTE_INTENSITY':
      return update(state, {
        opt: { routeIntensity: { $set: action.intensity } }
      })
    case 'TOGGLE_GPSCOLOR':
      return update(state, {
        opt: { $toggle: ['showGPSSpeed'] }
      })
    case 'TOGGLE_GPSTHREESECS':
      return update(state, {
        opt: { $toggle: ['showThreeSeconds'] }
      })
    case 'TOGGLE_SNAP':
      return update(state, {
        opt: { $toggle: ['snap'] }
      })
    case 'ZOOM':
      let zoom = doZoom(state.zoom, action.zoomIn)
      return update(state, {
        zoom: { $set: zoom }
      })
    default:
      return state
  }
}

function doZoom(prevZoom, zoomIn) {
  let zoom
  if (zoomIn) {
    zoom = { x: prevZoom.x * 1.2, y: prevZoom.y * 1.2 }
  } else {
    zoom = { x: prevZoom.x / 1.2, y: prevZoom.y / 1.2 }
  }
  return zoom
}

function rotateMap(prevAngle, clockwise) {
  if (clockwise) {
    return prevAngle + RG2.ROTATION_STEP_IN_DEGREES;
  } else {
    return prevAngle - RG2.ROTATION_STEP_IN_DEGREES;
  }
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
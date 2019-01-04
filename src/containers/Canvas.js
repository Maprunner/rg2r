import { connect } from 'react-redux'
import Map from '../components/Map'
import { scroll, zoom, rotateMap, startStop, setSpeed, setReplayMode, setTime, resetMap } from '../actions/actions.js'
import { getDisplayedRoutes, getRunners, getControls, getCourses, getCourseDisplay } from '../selectors/selectors.js'

const mapStateToProps = state => ({
  width: state.map.width,
  height: state.map.height,
  x: state.map.x,
  y: state.map.y,
  map: state.map.mapImage,
  opt: state.map.opt,
  zoom: state.map.zoom,
  angle: state.map.angle,
  courses: getCourses(state),
  routes: getDisplayedRoutes(state),
  animation: state.results.animation,
  runners: getRunners(state),
  controls: getControls(state),
  courseDisplay: getCourseDisplay(state),
  showControls: state.courses.showControls
})

const mapDispatchToProps = dispatch => ({
  onScroll: (delta, mousePos, zoom, xy) => dispatch(scroll(delta, mousePos, zoom, xy)),
  onZoom: (zoomIn) => dispatch(zoom(zoomIn)),
  onRotate: (clockwise) => dispatch(rotateMap(clockwise)),
  onResetMap: () => dispatch(resetMap()),
  onStartStop: () => dispatch(startStop()),
  onSetSpeed: (event) => dispatch(setSpeed(event)),
  onSetReplayMode: () => dispatch(setReplayMode()),
  onSetTime: (event) => dispatch(setTime(event))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
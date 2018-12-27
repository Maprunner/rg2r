import { connect } from 'react-redux'
import Map from '../components/Map'
import { scroll, zoom, startStop, setSpeed, setReplayMode, setTime } from '../actions/actions.js'
import { getDisplayedRoutes } from '../selectors/selectors.js'

const mapStateToProps = state => ({
  width: state.map.width,
  height: state.map.height,
  x: state.map.x,
  y: state.map.y,
  map: state.map.mapImage,
  opt: state.map.opt,
  zoom: state.map.zoom,
  courses: state.courses.data,
  routes: getDisplayedRoutes(state),
  animation: state.results.animation,
  runners: state.results.runners,
  controls: state.courses.controls,
  courseDisplay: state.courses.display
})

const mapDispatchToProps = dispatch => ({
  onScroll: (delta, mousePos, zoom, xy) => dispatch(scroll(delta, mousePos, zoom, xy)),
  onZoom: (zoomIn) => dispatch(zoom(zoomIn)),
  onStartStop: () => dispatch(startStop()),
  onSetSpeed: (event) => dispatch(setSpeed(event.target.value)),
  onSetReplayMode: () => dispatch(setReplayMode()),
  onSetTime: (event) => dispatch(setTime(event.value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
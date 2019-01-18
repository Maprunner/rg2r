import { connect } from 'react-redux'
import ConfigDialog from '../components/ConfigDialog'
import {
  setCircleSize, setCourseWidth, setMapIntensity, setRouteIntensity, toggleConfig, toggleSnap,
  toggleGPSColor, toggleGPSThreeSecs
} from '../actions/configActions.js'

const mapStateToProps = state => ({
  configOpen: state.ui.configOpen,
  opt: state.map.opt,
  height: state.map.height
})

const mapDispatchToProps = dispatch => ({
  onSetCircleSize: (event) => dispatch(setCircleSize(parseInt(event.target.value, 10))),
  onSetCourseWidth: (event) => dispatch(setCourseWidth(parseInt(event.target.value, 10))),
  onSetMapIntensity: (event) => dispatch(setMapIntensity(parseInt(event.target.value, 10))),
  onSetRouteIntensity: (event) => dispatch(setRouteIntensity(parseInt(event.target.value, 10))),
  onToggleConfig: () => dispatch(toggleConfig()),
  onToggleSnap: () => dispatch(toggleSnap()),
  onToggleGPSColor: () => dispatch(toggleGPSColor()),
  onToggleGPSThreeSecs: () => dispatch(toggleGPSThreeSecs())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigDialog)
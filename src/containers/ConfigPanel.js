import { connect } from 'react-redux'
import ConfigDialog from '../components/ConfigDialog'
import {
  setCircleSize, setCourseWidth, loadLanguage, setMapIntensity, setRouteIntensity, toggleConfig, toggleSnap,
  toggleGPSColor, toggleGPSThreeSecs
} from '../actions/configActions.js'
import { getDictionary } from '../selectors/selectors'

const mapStateToProps = state => ({
  configOpen: state.ui.configOpen,
  opt: state.map.opt,
  height: state.map.height,
  dict: getDictionary(state),
  language: state.ui.language
})

const mapDispatchToProps = dispatch => ({
  onSetCircleSize: (event) => dispatch(setCircleSize(parseInt(event.target.value, 10))),
  onSetCourseWidth: (event) => dispatch(setCourseWidth(parseInt(event.target.value, 10))),
  onSetMapIntensity: (event) => dispatch(setMapIntensity(parseInt(event.target.value, 10))),
  onSetRouteIntensity: (event) => dispatch(setRouteIntensity(parseInt(event.target.value, 10))),
  onToggleConfig: () => dispatch(toggleConfig()),
  onToggleSnap: () => dispatch(toggleSnap()),
  onToggleGPSColor: () => dispatch(toggleGPSColor()),
  onToggleGPSThreeSecs: () => dispatch(toggleGPSThreeSecs()),
  onSelectLanguage: (event) => dispatch(loadLanguage(event))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigDialog)
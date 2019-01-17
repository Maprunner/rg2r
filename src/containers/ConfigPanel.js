import { connect } from 'react-redux'
import ConfigDialog from '../components/ConfigDialog'
import { toggleConfig, toggleSnap, toggleGPSColor, toggleGPSThreeSecs } from '../actions/actions.js'

const mapStateToProps = state => ({
  configOpen: state.ui.configOpen,
  opt: state.map.opt,
  height: state.map.height
})

const mapDispatchToProps = dispatch => ({
  onToggleConfig: () => dispatch(toggleConfig()),
  onToggleSnap: () => dispatch(toggleSnap()),
  onToggleGPSColor: () => dispatch(toggleGPSColor()),
  onToggleGPSThreeSecs: () => dispatch(toggleGPSThreeSecs())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigDialog)
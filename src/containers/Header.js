import { connect } from 'react-redux'
import TopPanel from '../components/TopPanel'
import { toggleInfo, toggleControls, saveConfig } from '../actions/actions.js'

const mapStateToProps = state => ({
  title: state.events.title,
  options: state.map.options
})

const mapDispatchToProps = dispatch => ({
  onToggleInfo: () => dispatch(toggleInfo()),
  onToggleControls: () => dispatch(toggleControls()),
  onSaveConfig: (config) => dispatch(saveConfig(config))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopPanel)
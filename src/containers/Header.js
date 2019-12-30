import { connect } from 'react-redux'
import TopPanel from '../components/TopPanel'
import { toggleInfo, toggleControls, } from '../actions/actions.js'
import { toggleConfig, saveConfig } from '../actions/configActions.js'
import { getHash } from '../selectors/selectors';

const mapStateToProps = state => ({
  title: state.events.title,
  hash: getHash(state),
  options: state.map.options
})

const mapDispatchToProps = dispatch => ({
  onToggleInfo: () => dispatch(toggleInfo()),
  onToggleConfig: () => dispatch(toggleConfig()),
  onToggleControls: () => dispatch(toggleControls()),
  onSaveConfig: (config) => dispatch(saveConfig(config))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopPanel)
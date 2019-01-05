import { connect } from 'react-redux'
import Config from '../components/Config'
import { toggleConfig } from '../actions/actions.js'

const mapStateToProps = state => ({
  configOpen: state.ui.configOpen,
  //activeTabIndex: state.ui.activeTabIndex,
  //courseDisplay: state.courses.display,
  //resultDisplay: state.results.display,
  //courses: state.courses.data,
  //hasResults: state.results.data.length > 0,
  height: state.map.height
})

const mapDispatchToProps = dispatch => ({
  onToggleConfig: () => dispatch(toggleConfig())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config)
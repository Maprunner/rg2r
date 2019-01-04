import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { tabChanged, toggleInfo } from '../actions/actions.js'

const mapStateToProps = state => ({
  infoOpen: state.ui.infoOpen,
  activeTabIndex: state.ui.activeTabIndex,
  courseDisplay: state.courses.display,
  resultDisplay: state.results.display,
  courses: state.courses.data,
  hasResults: state.results.data.length > 0,
  height: state.map.height
})

const mapDispatchToProps = dispatch => ({
  onTabChange: (event) => dispatch(tabChanged(event.key)),
  onToggleInfo: () => dispatch(toggleInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
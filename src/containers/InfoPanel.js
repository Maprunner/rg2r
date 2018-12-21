import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { tabChanged, displayCourse, displayRoute } from '../actions/actions.js'

const mapStateToProps = state => ({
  activeTabIndex: state.ui.activeTabIndex,
  results: state.results.data,
  courses: state.courses.data,
  courseDisplay: state.courses.display,
  resultDisplay: state.results.display
})

const mapDispatchToProps = dispatch => ({
  onTabChange: (event) => dispatch(tabChanged(event.index)),
  onSelectRoute: (event) => dispatch(displayRoute(event.value, event.checked))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
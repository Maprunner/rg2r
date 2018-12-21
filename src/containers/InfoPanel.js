import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'
import { tabChanged } from '../actions/actions.js'

const mapStateToProps = state => ({
  activeTabIndex: state.ui.activeTabIndex,
  courseDisplay: state.courses.display,
  resultDisplay: state.results.display,
  courses: state.courses.data,
  hasResults: state.results.data.length > 0
})

const mapDispatchToProps = dispatch => ({
  onTabChange: (event) => dispatch(tabChanged(event.index)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
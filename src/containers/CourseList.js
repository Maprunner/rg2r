import { connect } from 'react-redux'
import CourseDisplay from '../components/CourseDisplay'
import { displayCourse, displayRoute, replayRoutesForCourse, filterResults } from '../actions/actions.js'
import {
  getCourses, getCoursesDisplay, getRouteCountByCourse,
  getResultCountByCourse, getAllRoutesDisplayed,
  getAllRoutesReplayed
} from '../selectors/selectors.js'

const mapStateToProps = (state) => {
  return {
    courses: getCourses(state),
    display: getCoursesDisplay(state),
    resultCount: getResultCountByCourse(state),
    routeCount: getRouteCountByCourse(state),
    allRoutesDisplayed: getAllRoutesDisplayed(state),
    allRoutesReplayed: getAllRoutesReplayed(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSelectCourse: (event) => dispatch(displayCourse(event.value, event.checked)),
    onFilterChange: filter => dispatch(filterResults(filter, props.courseIndex)),
    onDisplayAllRoutes: (event) => dispatch(displayRoute(event.target.value, event.target.name, event.target.checked)),
    onReplayAllRoutes: (event) => dispatch(replayRoutesForCourse(event.target.value, event.target.checked))

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDisplay)

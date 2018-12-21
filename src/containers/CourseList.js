import { connect } from 'react-redux'
import CourseDisplay from '../components/CourseDisplay'
import { displayCourse, replayRoute, filterResults } from '../actions/actions.js'
import {
  getCourses, getCoursesDisplay, getRouteCountByCourse, getResultCountByCourse
} from '../selectors/selectors.js'

const mapStateToProps = (state) => {
  return {
    courses: getCourses(state),
    display: getCoursesDisplay(state),
    resultCount: getResultCountByCourse(state),
    routeCount: getRouteCountByCourse(state)
  }

}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSelectCourse: (event) => dispatch(displayCourse(event.value, event.checked)),
    onReplay: (event) => dispatch(replayRoute(event.target.value, event.target.name, event.target.checked)),
    onFilterChange: filter => dispatch(filterResults(filter, props.courseIndex))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDisplay)

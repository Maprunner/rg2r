import { connect } from 'react-redux'
import CourseDisplay from '../components/CourseDisplay'
import { displayCourse, replayRoute, filterResults } from '../actions/actions.js'
import {
  makeGetVisibleResultsByCourse, getCourses,
  getCoursesDisplay, getRouteCountByCourse, getResultCountByCourse
} from '../selectors/selectors.js'

const makeMapStateToProps = () => {
  const getVisibleResultsByCourse = makeGetVisibleResultsByCourse()

  const mapStateToProps = (state, props) => {
    return {
      courses: getCourses(state),
      display: getCoursesDisplay(state),
      results: getResultCountByCourse(state),
      routes: getRouteCountByCourse(state)
      //filter: state.results.filter[props.courseIndex],
      //allRoutesDisplayed: allRoutesDisplayedByCourse(state, props),
      //allRoutesReplayed: allRoutesReplayedByCourse(state, props),
      //hasRoutes: courseHasRoutes(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSelectCourse: (event) => dispatch(displayCourse(event.value, event.checked)),
    onReplay: (event) => dispatch(replayRoute(event.target.value, event.target.name, event.target.checked)),
    onFilterChange: filter => dispatch(filterResults(filter, props.courseIndex))
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CourseDisplay)

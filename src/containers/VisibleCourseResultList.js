import { connect } from 'react-redux'
import CourseResultDisplay from '../components/CourseResultDisplay'
import {
  displayRoute, displayCourse,
  replayResult, filterResults, showResults
} from '../actions/actions.js'
import {
  makeGetVisibleResultsByCourse, makeAllRoutesDisplayedByCourse,
  makeAllRoutesReplayedByCourse, makeCourseHasRoutes,
  getResultsDisplay, getResultsReplay, getCourseDisplay, makeResultsDisplayedForCourse
} from '../selectors/selectors.js'

const makeMapStateToProps = () => {
  const getVisibleResultsByCourse = makeGetVisibleResultsByCourse()
  const allRoutesDisplayedByCourse = makeAllRoutesDisplayedByCourse()
  const allRoutesReplayedByCourse = makeAllRoutesReplayedByCourse()
  const courseHasRoutes = makeCourseHasRoutes()
  const resultsDisplayedForCourse = makeResultsDisplayedForCourse()

  const mapStateToProps = (state, props) => {
    return {
      results: getVisibleResultsByCourse(state, props),
      display: getResultsDisplay(state),
      courseDisplay: getCourseDisplay(state),
      replay: getResultsReplay(state),
      courseIndex: props.courseIndex,
      courseName: state.courses.data[props.courseIndex].name,
      filter: state.results.filter[props.courseIndex],
      allRoutesDisplayed: allRoutesDisplayedByCourse(state, props),
      allRoutesReplayed: allRoutesReplayedByCourse(state, props),
      hasRoutes: courseHasRoutes(state, props),
      isOpen: resultsDisplayedForCourse(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSelect: (event) => dispatch(displayRoute(event)),
    onShowResults: (event) => dispatch(showResults(event)),
    onSelectCourse: (event) => dispatch(displayCourse(event)),
    onReplay: (event) => dispatch(replayResult(event)),
    onFilterChange: filter => dispatch(filterResults(filter, props.courseIndex))
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CourseResultDisplay)

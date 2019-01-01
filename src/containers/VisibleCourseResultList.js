import { connect } from 'react-redux'
import CourseResultDisplay from '../components/CourseResultDisplay'
import { displayRoute, replayResult, filterResults } from '../actions/actions.js'
import {
  makeGetVisibleResultsByCourse, makeAllRoutesDisplayedByCourse,
  makeAllRoutesReplayedByCourse, makeCourseHasRoutes,
  getResultsDisplay, getResultsReplay
} from '../selectors/selectors.js'

const makeMapStateToProps = () => {
  const getVisibleResultsByCourse = makeGetVisibleResultsByCourse()
  const allRoutesDisplayedByCourse = makeAllRoutesDisplayedByCourse()
  const allRoutesReplayedByCourse = makeAllRoutesReplayedByCourse()
  const courseHasRoutes = makeCourseHasRoutes()

  const mapStateToProps = (state, props) => {
    return {
      results: getVisibleResultsByCourse(state, props),
      display: getResultsDisplay(state),
      replay: getResultsReplay(state),
      courseIndex: props.courseIndex,
      filter: state.results.filter[props.courseIndex],
      allRoutesDisplayed: allRoutesDisplayedByCourse(state, props),
      allRoutesReplayed: allRoutesReplayedByCourse(state, props),
      hasRoutes: courseHasRoutes(state, props)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSelect: (event) => dispatch(displayRoute(event)),
    onReplay: (event) => dispatch(replayResult(event)),
    onFilterChange: filter => dispatch(filterResults(filter, props.courseIndex))
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CourseResultDisplay)

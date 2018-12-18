// See https://github.com/reduxjs/reselect
import { createSelector } from 'reselect'

export const getCourses = (state) => state.courses.data
export const getResults = (state) => state.results.data
const getEvents = (state) => state.events.data
const getEventsFilter = (state) => state.events.filter
const getResultFilterByCourse = (state, props) => state.results.filter[props.courseIndex]
const getCourseByIndex = (state, props) => state.courses.data[props.courseIndex]

export const getDisplayedRoutes = (state) => {
  return state.results.data.filter(
    result => result.displayRoute
  )
}

const getResultsByCourse = (state, props) => {
  return state.results.data.filter(
    // TODO would be much better to store courseIndex in results...
    result => result.courseid === state.courses.data[props.courseIndex].courseid
  )
}

// apply search filter to list of events
export const getVisibleEvents = createSelector(
  [getEvents, getEventsFilter],
  (events, filter) => {
    return events.filter(
      (event) => event.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  }
)

// apply search filter for course to list of results for that course
export const makeGetVisibleResultsByCourse = () => {
  return createSelector(
    [getResultsByCourse, getResultFilterByCourse],
    (results, filter) => {
      return results.filter(
        (result) => result.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
      )
    }
  )
}

// allows setting of "All routes" checkbox for a course
// result.x.length > 0 shows there is a route to display
export const makeAllRoutesDisplayedByCourse = () => {
  return createSelector(
    [getResultsByCourse],
    (results) => {
      return results.findIndex(
        (result) => (result.x.length > 0) && (!result.displayRoute)) === -1
    }
  )
}

// allows setting of "All replay" checkbox for a course
export const makeAllRoutesReplayedByCourse = () => {
  return createSelector(
    [getResultsByCourse],
    (results) => {
      return results.findIndex(
        (result) => !result.replay) === -1
    }
  )
}

// allows setting of "All replay" checkbox for a course
export const makeCourseHasRoutes = () => {
  return createSelector(
    [getResultsByCourse],
    (results) => {
      return results.findIndex(
        (result) => result.x.length > 0) > -1
    }
  )
}

export const makeGetCourseByIndex = () => {
  return createSelector(
    [getCourseByIndex],
    (course) => {
      return course
    }
  )
}
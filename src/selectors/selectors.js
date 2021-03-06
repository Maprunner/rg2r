// See https://github.com/reduxjs/reselect
import { createSelector } from 'reselect'

export const getControls = (state) => state.courses.controls
const getCourseByIndex = (state, props) => state.courses.data[props.courseIndex]
export const getCourses = (state) => state.courses.data
export const getCourseDisplay = (state) => state.courses.display
export const getDictionary = (state) => state.ui.dictionary
const getEvents = (state) => state.events.data
const getEventsFilter = (state) => state.events.filter
const getResultFilterByCourse = (state, props) => state.results.filter[props.courseIndex]
export const getResults = (state) => state.results.data
export const getResultsDisplay = (state) => state.results.display
export const getResultsReplay = (state) => state.results.replay
export const getRunners = (state) => state.results.runners
const getShowResultsByCourseIndex = (state, props) => state.courses.showResults[props.courseIndex]
export const getTitle = (state) => state.ui.title



// create array of "all routes displayed" by course, plus "all routes for all courses" at end of array
export const getAllRoutesDisplayed = (state) => {
  let allRoutesDisplayed = Array.from(new Array(state.courses.data.length), function () { return true })
  let oldCourseIndex = 0
  let allCourse = true
  for (let i = 0; i < state.results.data.length; i += 1) {
    if (oldCourseIndex !== state.results.data[i].courseIndex) {
      allRoutesDisplayed[oldCourseIndex] = allCourse
      allCourse = true
      oldCourseIndex = state.results.data[i].courseIndex
    }
    if (state.results.data[i].x.length > 0) {
      allCourse = allCourse && state.results.display[i]
    }
  }
  allRoutesDisplayed[oldCourseIndex] = allCourse
  let allDisplayed = allRoutesDisplayed.reduce((all, routesDisplayed) => all && routesDisplayed, true)
  allRoutesDisplayed.push(allDisplayed)
  return allRoutesDisplayed
}

// create array of "all routes replayed" by course, plus "all routes for all courses" at end of array
export const getAllRoutesReplayed = (state) => {
  let allRoutesReplayed = Array.from(new Array(state.courses.data.length), function () { return true })
  let oldCourseIndex = 0
  let allCourse = true
  for (let i = 0; i < state.results.data.length; i += 1) {
    if (oldCourseIndex !== state.results.data[i].courseIndex) {
      allRoutesReplayed[oldCourseIndex] = allCourse
      allCourse = true
      oldCourseIndex = state.results.data[i].courseIndex
    }
    if (state.results.data[i].x.length > 0) {
      allCourse = allCourse && state.results.replay[i]
    }
  }
  allRoutesReplayed[oldCourseIndex] = allCourse
  let allReplayed = allRoutesReplayed.reduce((all, routesReplayed) => all && routesReplayed, true)
  allRoutesReplayed.push(allReplayed)
  return allRoutesReplayed
}

// create array of "is course displayed" by course, plus "all courses displayed" at end of array
export const getCoursesDisplay = (state) => {
  let display = state.courses.display.slice()
  let allDisplayed = display.reduce((all, courseDisplayed) => all && courseDisplayed, true)
  display.push(allDisplayed)
  return display
}

export const getCoursesForDraw = (state) => {
  return state.courses.data.map(
    course => ({ "text": course.name, "key": course.index })
  )
}

export const getDisplayedRoutes = (state) => {
  return state.results.data.filter(
    result => state.results.display[result.index]
  )
}

export const getDrawState = (state) => {
  if (state.events.activeEvent !== null) {
    return !state.events.activeEvent.locked
  }
  return false
}

export const getHash = (state) => {
  let hash = state.ui.hash
  if (state.courses.display.length !== 0) {
    let ids = []
    for (let i = 0; i < state.courses.display.length; i += 1) {
      if (state.courses.display[i]) {
        ids.push(state.courses.data[i].courseid)
      }
    }
    if (ids.length > 0) {
      hash = hash + "&course=" + ids.join(",")
    }
  }

  if (state.results.display.length !== 0) {
    let ids = []
    for (let i = 0; i < state.results.display.length; i += 1) {
      if (state.results.display[i]) {
        ids.push(state.results.data[i].resultid)
      }
    }
    if (ids.length > 0) {
      hash = hash + "&route=" + ids.join(",")
    }
  }

  return hash
}

const getResultsByCourse = (state, props) => {
  return state.results.data.filter(
    result => result.courseIndex === props.courseIndex
  )
}

// create array of result counts by course, plus total results at end of array
export const getResultCountByCourse = (state) => {
  let resultCount = Array.from(new Array(state.courses.data.length), function () { return 0 })
  let total = 0
  // need to allow for results with more than one route
  let oldId = 99999
  for (let i = 0; i < state.results.data.length; i += 1) {
    if (oldId !== state.results.data[i].rawid) {
      resultCount[state.results.data[i].courseIndex]++
      total++
    }
    oldId = state.results.data[i].rawid
  }
  resultCount.push(total)
  return resultCount
}

// create array of routes by course, plus total routes at end of array
export const getRouteCountByCourse = (state) => {
  let routeCount = Array.from(new Array(state.courses.data.length), function () { return 0 })
  let total = 0
  for (let i = 0; i < state.results.data.length; i += 1) {
    if (state.results.data[i].x.length > 0) {
      routeCount[state.results.data[i].courseIndex]++
      total++
    }
  }
  routeCount.push(total)
  return routeCount
}

// apply search filter to list of events
export const getVisibleEvents = createSelector(
  [getEvents, getEventsFilter],
  (events, filter) => {
    return events.filter(
      (event) => (event.date + ": " + event.name).toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  }
)

// allows setting of "All routes" checkbox for a course
// result.x.length > 0 shows there is a route to display
export const makeAllRoutesDisplayedByCourse = () => {
  return createSelector(
    [getResultsByCourse, getResultsDisplay],
    (results, display) => {
      return results.findIndex(
        (result) => (result.x.length > 0) && (!display[result.index])) === -1
    }
  )
}

// allows setting of "All replay" checkbox for a course
export const makeAllRoutesReplayedByCourse = () => {
  return createSelector(
    [getResultsByCourse, getResultsReplay],
    (results, replay) => {
      return results.findIndex(
        (result) => !replay[result.index]) === -1
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

export const makeResultsDisplayedForCourse = () => {
  return createSelector(
    [getShowResultsByCourseIndex],
    (show) => {
      return show
    }
  )
}
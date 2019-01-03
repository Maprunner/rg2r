import RG2 from '../rg2Constants'
export const DISPLAY_COURSE = 'DISPLAY_COURSE'
export const DISPLAY_ROUTE = 'DISPLAY_ROUTE'
export const EVENT_REQUESTED = 'EVENT_REQUESTED'
export const EVENTS_REQUESTED = 'EVENTS_REQUESTED'
export const FILTER_EVENTS = 'FILTER_EVENTS'
export const FILTER_RESULTS = 'FILTER_RESULTS'
export const LOAD_EVENTS = 'LOAD_EVENTS'
export const MAP_LOADED = 'MAP_LOADED'
export const REPLAY_RESULT = 'REPLAY_RESULT'
export const REPLAY_ROUTES_FOR_ALL_COURSES = 'REPLAY_ROUTES_FOR_ALL_COURSES'
export const REPLAY_ROUTES_FOR_COURSE = 'REPLAY_ROUTES_FOR_COURSE'
export const SET_REPLAY_MODE = 'SET_REPLAY_MODE'
export const SAVE_COURSES = 'SAVE_COURSES'
export const SAVE_EVENT = 'SAVE_EVENT'
export const SAVE_EVENTS = 'SAVE_EVENTS'
export const SCREEN_RESIZED = 'SCREEN_RESIZED'
export const SCROLL = 'SCROLL'
export const SET_SPEED = 'SET_SPEED'
export const SET_TIME = 'SET_TIME'
export const SHOW_RESULTS = 'SHOW_RESULTS'
export const START_STOP = 'START_STOP'
export const TAB_CHANGED = 'TAB_CHANGED'
export const TIMER_EXPIRED = 'TIMER_EXPIRED'
export const ZOOM = 'ZOOM'

export function displayCourse(event) {
  return {
    type: DISPLAY_COURSE,
    index: parseInt(event.target.value, 10),
    display: event.target.checked
  }
}

export function displayRoute(event) {
  return (dispatch) => {
    dispatch({
      type: DISPLAY_ROUTE,
      resultIndex: parseInt(event.target.id, 10),
      courseIndex: parseInt(event.target.value, 10),
      display: event.target.checked
    })
  }
}


export function eventRequested(index, id) {
  return {
    type: EVENT_REQUESTED,
    index: index,
    id: id
  }
}

export function eventsRequested() {
  return {
    type: EVENTS_REQUESTED
  }
}

export function filterEvents(filter) {
  return {
    type: 'FILTER_EVENTS',
    filter: filter
  }
}

export function filterResults(filter, courseIndex) {
  return {
    type: 'FILTER_RESULTS',
    filter: filter,
    courseIndex: courseIndex
  }
}

export function loadEvent(event) {
  return function (dispatch) {
    const image = new window.Image()

    if (process.env.NODE_ENV !== 'production') {
      // assumes development server running on port 80 to deal with api calls locally: see package.json
      image.src = 'http://localhost:80/rg2-test-data/hh/kartat/' + event.mapfilename
    } else {
      image.src = '/kartat/' + event.mapfilename
    }
    image.onload = () => {
      dispatch(mapLoaded(image))
    }
    dispatch(eventRequested(event, image))
    return fetch('/rg2/rg2api.php?type=event&id=' + event.id)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(saveEvent(json.data, event.format))
      )
  }
}

export function loadEvents() {
  // assumes server running on port 80 to deal with api calls: see package.json
  return function (dispatch) {
    dispatch(eventsRequested())
    return fetch('/rg2/rg2api.php?type=events')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(saveEvents(json.data.events))
      )
  }
}

export function mapLoaded(image) {
  return {
    type: MAP_LOADED,
    image: image
  }
}

export function replayResult(event) {
  // add course details for selected route replay
  return (dispatch, getState) => {
    dispatch({
      type: REPLAY_RESULT,
      resultIndex: parseInt(event.target.value, 10),
      display: event.target.checked,
      course: getState().courses.data[parseInt(event.target.id, 10)]
    })
  }
}

export function replayRoutesForCourse(event) {
  return (dispatch, getState) => {
    const courseIndex = parseInt(event.target.value, 10)
    if (courseIndex === RG2.ALL_COURSES) {
      dispatch({
        type: REPLAY_ROUTES_FOR_ALL_COURSES,
        display: event.target.checked,
        courses: getState().courses.data
      })
    } else {
      dispatch({
        type: REPLAY_ROUTES_FOR_COURSE,
        display: event.target.checked,
        course: getState().courses.data[courseIndex]
      })
    }
  }
}

export function saveCourses(courses) {
  return {
    type: SAVE_COURSES,
    courses: courses
  }
}

export function saveEvent(data, format) {
  return {
    type: SAVE_EVENT,
    data: data,
    format: format
  }
}

export function saveEvents(events) {
  return {
    type: SAVE_EVENTS,
    events: events
  }
}

export function screenResized() {
  let container = document.querySelector('#rg2-container')
  container.style.height = (window.innerHeight - RG2.TOOLBAR_HEIGHT) + 'px'
  return {
    type: SCREEN_RESIZED,
    width: window.innerWidth,
    height: window.innerHeight - RG2.TOOLBAR_HEIGHT
  }
}

export function scroll(delta, mousePos, zoom, xy) {
  return {
    type: SCROLL,
    delta: delta,
    mousePos: mousePos,
    zoom: zoom,
    xy: xy
  }
}

export function setReplayMode() {
  return {
    type: SET_REPLAY_MODE
  }
}

export function setSpeed(speed) {
  return {
    type: SET_SPEED,
    speed: parseInt(speed, 10)
  }
}

export function setTime(event) {
  return {
    type: SET_TIME,
    time: parseInt(event.target.value, 10)
  }
}

export function showResults(event) {
  return {
    type: SHOW_RESULTS,
    courseIndex: parseInt(event.target.value, 10),
    display: event.target.checked
  }
}

export function startStop() {
  return {
    type: START_STOP
  }
}

export function tabChanged(index) {
  return {
    type: TAB_CHANGED,
    index: index
  }
}

export function timerExpired() {
  return (dispatch, getState) => {
    if (getState().results.animation.timerRunning) {
      dispatch({
        type: TIMER_EXPIRED
      })
    }
  }
}

export function zoom(zoomIn) {
  return {
    type: ZOOM,
    zoomIn: zoomIn
  }
}
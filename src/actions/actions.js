import RG2 from '../rg2Constants'
export const DISPLAY_COURSE = 'DISPLAY_COURSE'
export const DISPLAY_ROUTE = 'DISPLAY_ROUTE'
export const EVENT_REQUESTED = 'EVENT_REQUESTED'
export const EVENTS_REQUESTED = 'EVENTS_REQUESTED'
export const FILTER_EVENTS = 'FILTER_EVENTS'
export const FILTER_RESULTS = 'FILTER_RESULTS'
export const INITIALISE_OPTIONS = 'INITIALISE_OPTIONS'
export const LOAD_EVENTS = 'LOAD_EVENTS'
export const MAP_LOADED = 'MAP_LOADED'
export const NAVIGATION = 'NAVIGATION'
export const REPLAY_RESULT = 'REPLAY_RESULT'
export const REPLAY_ROUTES_FOR_ALL_COURSES = 'REPLAY_ROUTES_FOR_ALL_COURSES'
export const REPLAY_ROUTES_FOR_COURSE = 'REPLAY_ROUTES_FOR_COURSE'
export const RESET_MAP = 'RESET_MAP'
export const ROTATE_MAP = 'ROTATE_MAP'
export const SET_REPLAY_MODE = 'SET_REPLAY_MODE'
export const SAVE_CONFIG = 'SAVE_CONFIG'
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
export const TOGGLE_CONFIG = 'TOGGLE_CONFIG'
export const TOGGLE_CONTROLS = 'TOGGLE_CONTROLS'
export const TOGGLE_INFO = 'TOGGLE_INFO'
export const TOGGLE_GPSCOLOR = 'TOGGLE_GPSCOLOR'
export const TOGGLE_GPSTHREESECS = 'TOGGLE_GPSTHREESECS'
export const TOGGLE_SNAP = 'TOGGLE_SNAP'
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


export function eventRequested(event) {
  return {
    type: EVENT_REQUESTED,
    event
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
    filter
  }
}

export function filterResults(filter, courseIndex) {
  return {
    type: 'FILTER_RESULTS',
    filter,
    courseIndex
  }
}

export function initialiseOptions(options) {
  return {
    type: 'INITIALISE_OPTIONS',
    options
  }
}

export function loadEvent(event) {
  return function (dispatch, getState) {
    // prevent reloading event if user double clicks on link
    if (!getState().events.singleEventLoading) {
      const image = new window.Image()
      image.src = window.rg2Config.maps_url + event.mapfilename
      image.onload = () => {
        dispatch(mapLoaded(image))
      }
      dispatch(eventRequested(event))
      return fetch(window.rg2Config.json_url + '?type=event&id=' + event.id)
        .then(
          response => response.json(),
          error => console.log('Error loading event ' + event.id + ' from API', error)
        )
        .then(
          json => dispatch(saveEvent(
            event.index,
            event.id,
            json.data,
            event.format,
            getState().events.pendingRoutes,
            getState().events.pendingCourses))
        )
    }
  }
}

export function loadEvents() {
  return function (dispatch) {
    dispatch(eventsRequested())
    return fetch(window.rg2Config.json_url + '?type=events')
      .then(
        response => response.json(),
        error => console.log('Error loading events from API.', error)
      )
      .then(json => dispatch(saveEvents(json.data.events))
      )
  }
}

export function mapLoaded(image) {
  return {
    type: MAP_LOADED,
    image
  }
}

export function navigation(hash) {
  return {
    type: NAVIGATION,
    hash
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

export function resetMap() {
  return {
    type: RESET_MAP
  }
}


export function rotateMap(clockwise) {
  return {
    type: ROTATE_MAP,
    clockwise
  }
}

export function saveConfig(config) {
  return {
    type: SAVE_CONFIG,
    config
  }
}

export function saveCourses(courses) {
  return {
    type: SAVE_COURSES,
    courses
  }
}

export function saveEvent(index, id, data, format, pendingRoutes, pendingCourses) {
  return {
    type: SAVE_EVENT,
    index,
    id,
    data,
    format,
    pendingRoutes,
    pendingCourses
  }
}

export function saveEvents(events) {
  return {
    type: SAVE_EVENTS,
    events
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
    delta,
    mousePos,
    zoom,
    xy
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
    time: event
  }
}

export function showResults(event) {
  return {
    type: SHOW_RESULTS,
    index: parseInt(event.target.id, 10)
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
    index
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

export function toggleConfig() {
  return {
    type: TOGGLE_CONFIG
  }
}

export function toggleControls() {
  return {
    type: TOGGLE_CONTROLS
  }
}

export function toggleGPSColor() {
  return {
    type: TOGGLE_GPSCOLOR
  }
}

export function toggleGPSThreeSecs() {
  return {
    type: TOGGLE_GPSTHREESECS
  }
}

export function toggleInfo() {
  return {
    type: TOGGLE_INFO
  }
}

export function toggleSnap() {
  return {
    type: TOGGLE_SNAP
  }
}

export function zoom(zoomIn) {
  return {
    type: ZOOM,
    zoomIn
  }
}
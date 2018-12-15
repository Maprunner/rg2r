export const LOAD_EVENTS = 'LOAD_EVENTS';
export const EVENTS_REQUESTED = 'EVENTS_REQUESTED';
export const EVENT_REQUESTED = 'EVENT_REQUESTED';
export const SAVE_EVENTS = 'SAVE_EVENTS';
export const SAVE_EVENT = 'SAVE_EVENT';
export const FILTER_EVENTS = 'FILTER_EVENTS';

export const SAVE_COURSES = 'SAVE_COURSES';

export const MAP_LOADED = 'MAP_LOADED';

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

export function loadEvent(event) {
  // assumes server running on port 80 to deal with api calls: see package.json
  return function (dispatch) {
    const image = new window.Image();
    image.src = 'http://localhost:80/rg2-test-data/hh/kartat/' + event.mapfilename;
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

export function mapLoaded(image) {
  return {
    type: MAP_LOADED,
    image: image
  }
}

export function eventsRequested() {
  return {
    type: EVENTS_REQUESTED
  }
}

export function eventRequested(index, id) {
  return {
    type: EVENT_REQUESTED,
    index: index,
    id: id
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

export function filterEvents(filter) {
  return {
    type: 'FILTER_EVENTS',
    filter: filter
  }
}

export function saveCourses(courses) {
  return {
    type: SAVE_COURSES,
    courses: courses
  }
}

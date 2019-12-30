import update from 'immutability-helper'
import Worldfile from '../utils/Worldfile.js'

const initialState = {
  data: [],
  filter: "",
  pendingEvent: null,
  pendingCourses: [],
  pendingRoutes: [],
  activeEvent: null,
  allEventsLoading: false,
  singleEventLoading: false,
  title: "Routegadget 2"
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_EVENTS':
      const events = processEvents(action.events)
      return update(state, {
        data: { $set: events.data },
        allEventsLoading: { $set: false },
        pendingEvent: { $set: events.hash.index },
        pendingCourses: { $set: events.hash.courses },
        pendingRoutes: { $set: events.hash.routes }
      })
    case 'FILTER_EVENTS':
      return update(state, { filter: { $set: action.filter } })
    case 'EVENTS_REQUESTED':
      return update(state, {
        allEventsLoading: { $set: true }
      })
    case 'LOAD_EVENTS':
      return state
    case 'SAVE_EVENT':
      let title = state.activeEvent.name + ' ' + state.activeEvent.date
      return update(state, {
        singleEventLoading: { $set: false },
        title: { $set: title },
        pendingEvent: { $set: null },
        pendingCourses: { $set: [] },
        pendingRoutes: { $set: [] }
      })
    case 'EVENT_REQUESTED':
      return update(state, {
        singleEventLoading: { $set: true },
        activeEvent: { $set: action.event },
        mapImage: { $set: action.image },
        pendingEvent: { $set: null }
      })
    case 'NAVIGATION':
      let hash = parseHash(action.hash, state.data)
      return update(state, {
        pendingEvent: { $set: hash.index },
        pendingCourses: { $set: hash.courses },
        pendingRoutes: { $set: hash.routes }
      })
    default:
      return state
  }
}

function parseHash(hash, events) {
  // hash looks like #id&course=a,b,c&result=x,y,z
  let id = null
  let index = null
  let courses = []
  let routes = []
  if (hash) {
    courses.length = 0
    routes.length = 0
    let fields = hash.split('&')
    for (let i = 0; i < fields.length; i += 1) {
      fields[i] = fields[i].toLowerCase()
      if (fields[i].search('#') !== -1) {
        id = parseInt(fields[i].replace("#", ""), 10)
      }
      if (fields[i].search('course=') !== -1) {
        courses = fields[i].replace("course=", "").split(',')
      }
      if (fields[i].search('route=') !== -1) {
        routes = fields[i].replace("route=", "").split(',')
      }
    }
    // convert to integers: NaNs sort themselves out on display so don't check here
    courses = courses.map(Number)
    routes = routes.map(Number)

    if (isNaN(id)) {
      id = null
      courses.length = 0
      routes.length = 0
    }
  }

  if (id !== null) {
    for (let i = 0; i < events.length; i += 1) {
      if (events[i].id === id) {
        index = i
        break
      }
    }
  }

  return { id: id, courses: courses, routes: routes, index: index }
}

function processEvents(prevEvents) {
  let events = prevEvents.slice()
  for (let i = 0; i < events.length; i += 1) {
    switch (events[i].type) {
      case "I":
        events[i].type = "International event"
        break
      case "N":
        events[i].type = "National event"
        break
      case "R":
        events[i].type = "Regional event"
        break
      case "L":
        events[i].type = "Local event"
        break
      case "T":
        events[i].type = "Training event"
        break
      default:
        events[i].type = "Unknown"
        break
    }
    if (events[i].suffix === undefined) {
      events[i].mapfilename = events[i].mapid + '.jpg'
    } else {
      events[i].mapfilename = events[i].mapid + '.' + events[i].suffix
      delete events[i].suffix
    }
    events[i].worldfile = new Worldfile(events[i])
    if (events[i].worldfile.valid) {
      delete events[i].A
      delete events[i].B
      delete events[i].C
      delete events[i].D
      delete events[i].E
      delete events[i].F
    }
  }
  events.sort(function (a, b) {
    return b.id - a.id
  })

  // add sorted index to data to make life easier...
  // avoids need to keep searching for RG2 kartatid
  events.map((event, i) => {
    event.index = i
    return event
  })

  const hash = parseHash(window.location.hash, events)

  return { data: events, hash: hash }
}

export default events
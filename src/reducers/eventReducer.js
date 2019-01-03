import update from 'immutability-helper'
import Worldfile from '../utils/Worldfile.js'

const initialState = {
  data: [],
  filter: "",
  activeEvent: null,
  allEventsLoading: false,
  singleEventLoading: false,
  title: "Routegadget 2"
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_EVENTS':
      return update(state, { data: { $set: processEvents(action.events) }, allEventsLoading: { $set: false } })
    case 'FILTER_EVENTS':
      return update(state, { filter: { $set: action.filter } })
    case 'EVENTS_REQUESTED':
      return update(state, { allEventsLoading: { $set: true } })
    case 'LOAD_EVENTS':
      return state
    case 'SAVE_EVENT':
      let title = state.activeEvent.name + ' ' + state.activeEvent.date
      return update(state, {
        singleEventLoading: { $set: false },
        title: { $set: title },
      })
    case 'EVENT_REQUESTED':
      return update(state, {
        singleEventLoading: { $set: true },
        activeEvent: { $set: action.event },
        mapImage: { $set: action.image },
      })
    default:
      return state
  }
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

  return events
}

export default events
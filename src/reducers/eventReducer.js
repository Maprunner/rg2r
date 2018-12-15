import update from 'immutability-helper';

const initialState = {
  data: [],
  filter: "",
  activeEvent: null,
  allEventsLoading: false,
  singleEventLoading: false,
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_EVENTS':
      return update(state, { data: { $set: processEvents(action.events) }, allEventsLoading: { $set: false } });
    case 'FILTER_EVENTS':
      return update(state, { filter: { $set: action.filter } });
    case 'EVENTS_REQUESTED':
      return update(state, { allEventsLoading: { $set: true } });
    case 'LOAD_EVENTS':
      return state
    case 'SAVE_EVENT':
      return update(state, {
        singleEventLoading: { $set: false }
      });
    case 'EVENT_REQUESTED':
      return update(state, {
        singleEventLoading: { $set: true },
        activeEvent: { $set: action.event },
        mapImage: { $set: action.image },
      });
    default:
      return state
  }
}

function processEvents(newEvents) {
  for (let i = 0; i < newEvents.length; i += 1) {
    switch (newEvents[i].type) {
      case "I":
        newEvents[i].type = "International event";
        break;
      case "N":
        newEvents[i].type = "National event";
        break;
      case "R":
        newEvents[i].type = "Regional event";
        break;
      case "L":
        newEvents[i].type = "Local event";
        break;
      case "T":
        newEvents[i].type = "Training event";
        break;
      default:
        newEvents[i].type = "Unknown";
        break;
    }
    if (newEvents[i].suffix === undefined) {
      newEvents[i].mapfilename = newEvents[i].mapid + '.jpg';
    } else {
      newEvents[i].mapfilename = newEvents[i].mapid + '.' + newEvents[i].suffix;
      delete newEvents[i].suffix;
    }
    //events[i].worldfile = new rg2.Worldfile(data);
  }
  newEvents.sort(function (a, b) {
    return b.id - a.id;
  });

  // add sorted index to data to make life easier...
  // avoids need to keep searching for RG2 kartatid
  newEvents.map((event, i) => {
    event.index = i;
    return event;
  })

  return newEvents;
}

export default events;
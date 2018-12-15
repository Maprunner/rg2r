import { combineReducers } from 'redux';
import events from './eventReducer.js';
import courses from './courseReducer.js';
import map from './mapReducer.js';

// Root reducer
const rootReducer = combineReducers({
  events,
  courses,
  map
})

export default rootReducer;
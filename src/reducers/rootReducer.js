import { combineReducers } from 'redux';
import events from './eventReducer.js';
import courses from './courseReducer.js';

// Root reducer
const rootReducer = combineReducers({
  events,
  courses
})

export default rootReducer;
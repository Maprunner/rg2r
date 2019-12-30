import { combineReducers } from 'redux'
import events from './eventReducer.js'
import courses from './courseReducer.js'
import results from './resultReducer.js'
import ui from './uiReducer.js'
import map from './mapReducer.js'
import draw from './drawReducer.js'

// Root reducer
const rootReducer = combineReducers({
  events,
  courses,
  results,
  ui,
  map,
  draw
})

export default rootReducer
import update from 'immutability-helper'
import { isScoreEvent, getAngleBetweenPoints } from '../utils/rg2utils.js'
import RG2 from '../rg2Constants'

const initialState = {
  data: [],
  display: [],
  controls: [],
  // temporary (?) accordion functions
  showResults: [],
  showControls: false
}

const courses = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_COURSE':
      return update(state, {
        display: { $set: displayCourses(state.display, action.index, action.display) }
      })
    case 'SHOW_RESULTS':
      return update(state, {
        showResults: { $set: showResults(state.showResults, action.index) }
      })
    case 'SAVE_EVENT':
      return update(state, {
        data: { $set: processCourses(action.data.courses, action.data.format) },
        controls: { $set: extractControls(action.data.courses) },
        display: { $set: initialiseDisplay(action.data.courses, action.pendingCourses) },
        showResults: { $set: initialiseShowResults(action.data.courses) }
      })
    case 'TOGGLE_CONTROLS':
      return update(state, {
        showControls: { $set: !state.showControls }
      })
    case 'EVENT_REQUESTED':
      return initialState
    default:
      return state
  }
}

function initialiseDisplay(courses, pendingCourses) {
  let display = []
  for (let i = 0; i < courses.length; i += 1) {
    display[i] = false
  }
  for (let i = 0; i < pendingCourses.length; i += 1) {
    let index = getCourseIndexFromId(courses, pendingCourses[i])
    if (index !== null) {
      display[index] = true
    }
  }
  return display
}

function getCourseIndexFromId(courses, courseid) {
  let index = courses.findIndex(course => course.courseid === courseid)
  if (index === -1) {
    index = null
  }
  return index
}

function initialiseShowResults(courses) {
  let showResults = []
  for (let i = 0; i < courses.length; i += 1) {
    showResults[i] = false
  }
  return showResults
}


function displayCourses(prevDisplay, index, display) {
  let courses = prevDisplay.slice()
  if (index === RG2.ALL_COURSES) {
    for (let i = 0; i < courses.length; i += 1) {
      courses[i] = display
    }
  } else {
    courses[index] = display
  }
  return courses
}

function showResults(prevShowResults, index) {
  let showResults = prevShowResults.slice()
  showResults[index] = !showResults[index]
  return showResults
}

function processCourses(courses, format) {
  for (let i = 0; i < courses.length; i += 1) {
    courses[i].isScoreCourse = isScoreEvent(format)
    courses[i].index = i
    courses[i].x = courses[i].xpos
    courses[i].y = courses[i].ypos
    delete courses[i].xpos
    delete courses[i].ypos
    let angle, c1x, c1y, c2x, c2y, c3x, c3y
    courses[i].angle = []
    courses[i].textAngle = []
    for (let j = 0; j < (courses[i].x.length - 1); j += 1) {
      if (courses[i].isScoreCourse) {
        // align score event start triangle and controls upwards
        courses[i].angle[j] = Math.PI * -0.5
        courses[i].textAngle[j] = Math.PI * -0.5
      } else {
        // angle of line to next control
        courses[i].angle[j] = getAngleBetweenPoints(courses[i].x[j], courses[i].y[j], courses[i].x[j + 1], courses[i].y[j + 1])
        if (j > 0) {
          // create bisector of angle to position number
          c1x = Math.cos(courses[i].angle[j - 1])
          c1y = Math.sin(courses[i].angle[j - 1])
          c2x = Math.cos(courses[i].angle[j]) + c1x
          c2y = Math.sin(courses[i].angle[j]) + c1y
          c3x = c2x / 2
          c3y = c2y / 2
          angle = getAngleBetweenPoints(c3x, c3y, c1x, c1y)
          courses[i].textAngle[j] = angle
        } else {
          courses[i].textAngle[0] = Math.PI * -0.5
        }
      }
    }
    // angle for finish aligns to north
    courses[i].angle[courses[i].x.length - 1] = Math.PI * -0.5
    courses[i].textAngle[courses[i].x.length - 1] = Math.PI * -0.5
  }
  return courses
}

function controlExists(controls, code) {
  if (controls.find(control => control.code === code) === -1) {
    return false
  } else {
    return true
  }
}

function extractControls(courses) {
  let codes
  let controls = []
  for (let i = 0; i < courses.length; i += 1) {
    if (courses[i] !== undefined) {
      codes = courses[i].codes
      if (codes !== undefined) {
        for (let j = 0; j < codes.length; j += 1) {
          if (controlExists(controls, codes[j])) {
            controls.push({ code: codes[j], x: courses[i].x[j], y: courses[i].y[j] })
          }
        }
      }
    }
  }
  return controls
}

export default courses
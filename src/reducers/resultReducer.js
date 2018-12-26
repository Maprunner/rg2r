import update from 'immutability-helper'
import Utils from '../utils/rg2utils.js'
import RG2 from '../rg2Constants'
import he from 'he'

// results data array attributes
// canDelete: false              route can be deleted by this user
// colour: null
// courseid: 1                   NOT index into courses
// coursename: "Blue" 
// displayScoreCourse: false     ??
// hasValidTrack: false          route has been expanded successfully
// initials: "SE"
// index                         index into data array to make life easier elsewhere
// isGPSTrack: false             potentially redundant: could derive from resultid
// isScoreEvent: false
// legpos: []                    position for given leg
// name: "Simon Errington"
// position: "1"
// racepos: []                   race position at end of leg
// rawid: 1                      resultid mod GPS value (50000)
// rawx: []                      x values for route from API: deleted once expanded into x
// rawy: []                      y values for route from API: deleted once expanded into y
// replay: false                 route is selected for animation
// resultid: 1                   original result id
// showResult: true              result present on results tab (not filtered out)
// speedColour: []               used when displaying GPS speed colouring
// splits: []
// starttime: 37802
// status: "ok"
// time: "44:23"
// token: 0                      allows deletion of route drawn on this device
// x: []                         x values for route
// xysecs: []                    time in seconds at each point on route
// y: []                         y values for route

const initialState = {
  // array of results data
  data: [],
  display: [],
  replay: [],
  // array of one search filter per course
  filter: [],
  // array of runners selected for replay
  runners: [],
  // replay details
  animation: {
    timerRunning: false,
    animationTime: 0,
    timerIncrement: 500,
    time: 0,
    millisecs: 0,
    earliestStartSecs: RG2.ONE_DAY_IN_SECONDS,
    latestFinishSecs: 0,
    slowestTimeSecs: 0,
    startSecs: 0,
    realTime: false,
    useFullTails: false,
    tailStartTimeSecs: 0
  }
}

const results = (state = initialState, action) => {
  let results
  let animation
  switch (action.type) {
    case 'DISPLAY_ROUTE':
      return update(state, {
        display: { $set: displayRoutes(state.data, state.display, action.resultIndex, action.courseIndex, action.display) }
      })
    case 'REPLAY_RESULT':
      results = replayResults(state.data, state.runners, state.animation, state.replay, action.resultIndex, action.display, action.course)
      return update(state, {
        data: { $set: results.data },
        runners: { $set: results.runners },
        animation: { $set: results.animation },
        replay: { $set: results.replay }
      })
    case 'REPLAY_ROUTES_FOR_ALL_COURSES':
      results = replayRoutesForAllCourses(state.data, state.runners, state.replay, action.display, action.courses)
      return update(state, {
        data: { $set: results.data },
        runners: { $set: results.runners },
        replay: { $set: results.replay }
      })
    case 'REPLAY_ROUTES_FOR_COURSE':
      results = replayRoutesForCourse(state.data, state.runners, state.replay, action.display, action.course)
      return update(state, {
        data: { $set: results.data },
        runners: { $set: results.runners },
        replay: { $set: results.replay }
      })
    case 'START_STOP':
      animation = handleStartStop(state.animation)
      return update(state, {
        animation: { $set: animation }
      })
    case 'TIMER_EXPIRED':
      animation = handleTimer(state.animation)
      return update(state, {
        animation: { $set: animation }
      })
    case 'SET_SPEED':
      animation = setAnimationSpeed(state.animation, action.speed)
      return update(state, {
        animation: { $set: animation }
      })
    case 'SET_TIME':
      animation = setAnimationTime(state.animation, action.time)
      return update(state, {
        animation: { $set: animation }
      })
    case 'SET_REPLAY_MODE':
      animation = setAnimationMode(state.animation)
      return update(state, {
        animation: { $set: animation }
      })
    case 'FILTER_RESULTS':
      let filter = state.filter.slice()
      filter[action.courseIndex] = action.filter
      return update(state, { filter: { $set: filter } })
    case 'SAVE_EVENT':
      results = processResults(action.data.results, action.data.routes, action.data.courses, action.data.format)
      return update(state, {
        data: { $set: results.data },
        display: { $set: results.display },
        replay: { $set: results.replay },
        filter: { $set: results.filter }
      })
    case 'EVENT_REQUESTED':
      return initialState
    default:
      return state
  }
}

function setAnimationMode(currentAnimation) {
  let animation = Object.assign({}, currentAnimation)
  // toggle between real time and mass start
  animation.realTime = !animation.realTime
  return animation
}

function handleStartStop(currentAnimation) {
  let animation = Object.assign({}, currentAnimation)
  animation.timerRunning = !animation.timerRunning
  return animation
}

function handleTimer(currentAnimation) {
  let animation = Object.assign({}, currentAnimation)
  // only increment time if we haven't got to the end already
  if (animation.realTime) {
    if (animation.time < animation.latestFinishSecs) {
      animation.millisecs += animation.timerIncrement
    }
  } else {
    if (animation.time < animation.slowestTimeSecs) {
      animation.millisecs += animation.timerIncrement
    }
  }
  animation.time = parseInt((animation.millisecs / 1000), 10)
  // find earliest time we need to worry about when drawing screen
  if (animation.useFullTails) {
    animation.tailStartTimeSecs = animation.startSecs + 1
  } else {
    animation.tailStartTimeSecs = Math.max(animation.time - animation.tailLength, animation.startSecs + 1)
  }
  return animation
}

function setAnimationSpeed(currentAnimation, speed) {
  let animation = Object.assign({}, currentAnimation)
  animation.timerIncrement = speed
  return animation
}

function displayRoutes(results, currentDisplay, index, courseIndex, doDisplay) {
  let display = currentDisplay.slice()
  if (index === RG2.ALL_ROUTES) {
    for (let i = 0; i < results.length; i += 1) {
      if ((results[i].courseIndex === courseIndex) || (courseIndex === RG2.ALL_COURSES)) {
        if (results[i].hasValidTrack) {
          display[i] = doDisplay
        }
      }
    }
  } else {
    display[index] = doDisplay
  }
  return display
}

function replayResults(currentResults, currentRunners, currentAnimation, currentReplay, index, display, course) {
  // index can be a result index or RG2.ALL_ROUTES
  let results = currentResults.slice()
  let replay = currentReplay.slice()
  let runners = currentRunners.slice()
  if (index === RG2.ALL_ROUTES) {
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].coursename === course.name) {
        replay[i] = display
        runners = toggleRunner(results[i], runners, course, display)
      }
    }
  } else {
    replay[index] = display
    runners = toggleRunner(results[index], runners, course, display)
  }
  let animation = setAnimationDetails(runners, currentAnimation)
  return { data: results, runners: runners, animation: animation, replay: replay }
}


function replayRoutesForCourse(currentResults, currentRunners, currentReplay, display, course) {
  // replays all routes for a given course
  let results = currentResults.slice()
  let runners = currentRunners.slice()
  for (let i = 0; i < results.length; i += 1) {
    if (results[i].courseIndex === course.index) {
      if (results[i].x.length > 0) {
        results[i].replay = display
        runners = toggleRunner(results[i], runners, course, display)
      }
    }
  }
  let replay = setAnimationDetails(runners, currentReplay)
  return { data: results, runners: runners, replay: replay }
}


function replayRoutesForAllCourses(currentResults, currentRunners, currentReplay, display, courses) {
  // replays all results that have routes
  let results = currentResults.slice()
  let runners = currentRunners.slice()
  for (let i = 0; i < results.length; i += 1) {
    if (results[i].x.length > 0) {
      results[i].replay = display
      runners = toggleRunner(results[i], runners, courses[results[i].courseIndex], display)
    }
  }
  let replay = setAnimationDetails(runners, currentReplay)
  return { data: results, runners: runners, replay: replay }
}

function toggleRunner(result, runners, course, display) {
  if (display) {
    runners.push(addRunner(result, course))
  } else {
    // remove runner
    runners = runners.filter(runner => runner.resultIndex !== result.index)
  }
  return runners
}

function addRunner(result, course) {
  let runner = {}
  runner.resultIndex = result.index
  runner.name = result.name
  runner.initials = result.initials
  runner.starttime = result.starttime
  runner.splits = result.splits
  runner.legpos = result.legpos
  runner.colour = result.colour
  // runner.colour = rg2.colours.getNextColour()
  // get course details
  if (result.isScoreEvent) {
    course = {}
    course.name = result.coursename
    course.x = result.scorex
    course.y = result.scorey
    course.codes = result.scorecodes
  }
  runner.coursename = course.name
  // used to stop runners when doing replay by control
  runner.nextStopTime = RG2.VERY_HIGH_TIME_IN_SECS
  // map position x,y indexed by running time in seconds
  runner.x = []
  runner.y = []

  // total distance travelled indexed by running time in seconds
  // in metres if georeferenced, otherwise in pixels
  runner.cumulativeDistance = []
  runner.cumulativeDistance[0] = 0

  // distance travelled for a leg indexed by control number
  runner.legTrackDistance = []
  runner.legTrackDistance[0] = 0

  // total distance travelled at end of leg indexed by control number
  runner.cumulativeTrackDistance = []
  runner.cumulativeTrackDistance[0] = 0

  if (result.hasValidTrack) {
    runner = expandTrack(runner, result.x, result.y, result.xysecs)
  } else {
    // no track so use straight line between controls
    runner = expandTrack(runner, course.x, course.y, result.splits)
  }
  runner = addTrackDistances(runner, course)

  return runner
}

function addTrackDistances(runner, course) {
  // add track distances for each leg
  var control, ind, lastPointIndex
  lastPointIndex = runner.cumulativeDistance.length - 1
  if (course.codes !== undefined) {
    // if we got no splits then there will just be a finish time
    if (runner.splits.length > 1) {
      for (control = 1; control < course.codes.length; control += 1) {
        // avoid NaN values for GPS tracks that are shorter than the result time
        if (runner.splits[control] <= lastPointIndex) {
          ind = runner.splits[control]
        } else {
          ind = lastPointIndex
        }
        runner.cumulativeTrackDistance[control] = runner.cumulativeDistance[ind]
        runner.legTrackDistance[control] = runner.cumulativeTrackDistance[control] - runner.cumulativeTrackDistance[control - 1]
      }
    } else {
      // allows for tracks at events with no results so no splits: just use start and finish
      runner.legTrackDistance[1] = runner.cumulativeDistance[lastPointIndex]
      runner.cumulativeTrackDistance[1] = runner.cumulativeDistance[lastPointIndex]
    }
  }
  return runner
}

function expandTrack(runner, x, y, time) {
  // gets passed arrays of x, y and time
  // iterate over item which will be xy or controls
  var item, diffx, diffy, difft, t, diffdist, tox, toy, dist, timeatprevitem, timeatitem, fromx, fromy, fromdist, metresPerPixel
  timeatprevitem = 0
  timeatitem = 0
  fromx = x[0]
  fromy = y[0]
  fromdist = 0
  dist = 0
  runner.x[0] = x[0]
  runner.y[0] = y[0]
  //let metresPerPixel = rg2.events.getMetresPerPixel()
  if (metresPerPixel === undefined) {
    metresPerPixel = 1
  }
  for (item = 1; item < time.length; item += 1) {
    tox = x[item]
    toy = y[item]
    diffx = tox - fromx
    diffy = toy - fromy
    dist = dist + (Utils.getDistanceBetweenPoints(tox, toy, fromx, fromy) * metresPerPixel)
    diffdist = dist - fromdist
    timeatitem = time[item]
    // allow for 0 splits indicating a missed control
    // just assume a 1 second split for now: probably harmless
    if (timeatitem === 0) {
      timeatitem = timeatprevitem + 1
    }
    difft = timeatitem - timeatprevitem
    for (t = timeatprevitem + 1; t < timeatitem; t += 1) {
      runner.x[t] = Math.round(fromx + ((t - timeatprevitem) * diffx / difft))
      runner.y[t] = Math.round(fromy + ((t - timeatprevitem) * diffy / difft))
      runner.cumulativeDistance[t] = Math.round(fromdist + ((t - timeatprevitem) * diffdist / difft))
    }
    runner.x[timeatitem] = tox
    runner.y[timeatitem] = toy
    runner.cumulativeDistance[timeatitem] = Math.round(dist)
    fromx = tox
    fromy = toy
    fromdist = dist
    timeatprevitem = timeatitem
  }
  return runner
}

function setAnimationDetails(runners, oldAnimation) {
  let animation = Object.assign({}, oldAnimation)
  animation.earliestStartSecs = RG2.ONE_DAY_IN_SECONDS
  animation.latestFinishSecs = 0
  animation.slowestTimeSecs = 0
  for (let i = 0; i < runners.length; i += 1) {
    if (runners[i].starttime < animation.earliestStartSecs) {
      animation.earliestStartSecs = runners[i].starttime
    }
    if ((runners[i].starttime + runners[i].x.length) > animation.latestFinishSecs) {
      animation.latestFinishSecs = runners[i].starttime + runners[i].x.length
    }
    if ((runners[i].x.length) > animation.slowestTimeSecs) {
      animation.slowestTimeSecs = runners[i].x.length
    }
  }
  return setAnimationTime(animation, 0)
}

function setAnimationTime(currentAnimation, time) {
  let animation = Object.assign({}, currentAnimation)
  // sets animation time
  if (animation.realTime) {
    // if we got a time it was from the slider so use it
    if (time > 0) {
      animation.time = time
    } else {
      animation.time = animation.earliestStartSecs
    }
    animation.startSecs = animation.earliestStartSecs
  } else {
    if (time > 0) {
      animation.time = time
    } else {
      animation.time = 0
    }
    animation.startSecs = 0
  }
  animation.millisecs = animation.time * 1000
  return animation
}

function processResults(currentResults, routes, courses, format) {
  // TODO Events with no results
  let results = combineResults(currentResults, routes)
  let display = []
  let replay = []
  let scorecodes = []
  let scorex = []
  let scorey = []
  let variant
  // extract score course details if necessary
  if (format === RG2.SCORE_EVENT) {
    // details are only sent the first time a variant occurs (to reduce file size quite a lot in some cases)
    // so need to extract them for use later
    for (let i = 0; i < results.length; i += 1) {
      variant = results[i].variant
      if (scorecodes[variant] === undefined) {
        scorecodes[variant] = results[i].scorecodes
        scorex[variant] = results[i].scorex
        scorey[variant] = results[i].scorey
      }
    }
  }
  for (let i = 0; i < results.length; i += 1) {
    // modify fields from API as necessary
    // get round iconv problem in API: unescape special characters to get sensible text
    if (results[i].comments) {
      results[i].comments = he.decode(results[i].comments)
    } else {
      results[i].comments = ""
    }
    results[i].name = he.decode(results[i].name)
    results[i].splits = adjustRawSplits(results[i].splits, results[i].time)

    // add extra detail to each result
    results[i].canDelete = false
    results[i].colour = null
    // this assumes saved courses are in same order as array received from API
    results[i].courseIndex = getCourseIndexFromId(courses, results[i].courseid)
    if (results[i].coursename === "") {
      results[i].coursename = courses[results[i].courseIndex].coursename
    }
    results[i].displayScoreCourse = false
    results[i].hasValidTrack = false
    results[i].index = i
    results[i].initials = getInitials(results[i].name)
    if (results[i].resultid >= RG2.GPS_RESULT_OFFSET) {
      results[i].isGPSTrack = true
    } else {
      results[i].isGPSTrack = false
    }
    results[i].isScoreEvent = format === RG2.SCORE_EVENT
    results[i].legpos = []
    results[i].racepos = []
    results[i].rawid = results[i].resultid % RG2.GPS_RESULT_OFFSET
    results[i].showResult = true
    results[i].token = 0
    results[i].x = expandAPITrack(results[i].rawx)
    results[i].y = expandAPITrack(results[i].rawy)
    results[i].speedColour = []
    results[i].xysecs = []
    delete results[i].delete
    delete results[i].rawx
    delete results[i].rawy
    if (format === RG2.SCORE_EVENT) {
      // save control locations for score course result
      results[i].scorex = scorex[results[i].variant]
      results[i].scorey = scorey[results[i].variant]
      results[i].scorecodes = scorecodes[results[i].variant]
    }
    if (results[i].x.length > 0) {
      let course = courses.find(course => course.name === results[i].coursename)
      results[i].colour = RG2.COLOURS[results[i].rawid % RG2.COLOURS.length]
      results[i] = expandRoute(results[i], course, format)
    }
    display[i] = false
    replay[i] = false
  }
  // setDeletionInfo()
  // sanitiseSplits()
  // generateLegPositions()


  return {
    data: results,
    display: display,
    replay: replay,
    filter: initialiseFilter(courses)
  }
}

function getCourseIndexFromId(courses, courseid) {
  const index = courses.findIndex(course => course.courseid === courseid)
  return index
}

function initialiseFilter(courses) {
  let filter = []
  for (let i = 0; i < courses.length; i += 1) {
    filter[i] = ''
  }
  return filter
}

function adjustRawSplits(rawSplits) {
  // insert a 0 split at the start to make life much easier elsewhere
  rawSplits.splice(0, 0, 0)
  // splits are time in seconds at control, but may have 0 for missing controls
  // make life easier elsewhere by replacing 0 with time at previous control
  for (let i = 1; i < rawSplits.length; i += 1) {
    if (rawSplits[i] === 0) {
      rawSplits[i] = rawSplits[i - 1]
    }
  }
  return rawSplits
}

function combineResults(oldResults, routes) {
  let results = mergeRoutes(oldResults, routes)
  // want to avoid extra results line for GPS routes if there is no drawn route
  // first sort so that GPS routes come after initial result
  results.sort(sortByCourseIDThenResultID)
  // now we can combine first GPS route with original result if needed
  let oldID = undefined
  let canCombine = false
  for (let i = 0; i < results.length; i += 1) {
    results[i].delete = false
    if (results[i].rawid === oldID) {
      // second or subsequent route for this result
      if (canCombine) {
        if (results[i].rawx.length > 0) {
          // found a route to combine
          results[i - 1].delete = true
          // copy missing details to GPS route
          results[i].position = results[i - 1].position
          results[i].splits = results[i - 1].splits
          results[i].status = results[i - 1].status
          results[i].time = results[i - 1].time
          canCombine = false
        }
      }
    } else {
      // this is the original result which can be combined if
      // it doesn't already have a drawn route, indicated by at least one point in the rawx array
      canCombine = results[i].rawx.length === 0
      oldID = results[i].rawid
    }
  }
  return results.filter(result => result.delete === false)
}
function mergeRoutes(oldResults, routes) {
  // adds routes to the relevant result
  // should really get the API to do this at a later stage...
  if (routes.length === 0) {
    return oldResults.map((result) => {
      result.rawx = []
      result.rawy = []
      return result
    })
  }
  let results = oldResults.sort(function (a, b) {
    return a.resultid - b.resultid
  })
  routes.sort(function (a, b) {
    return a.id - b.id
  })
  let j = 0
  for (let i = 0; i < results.length; i += 1) {
    results[i].rawid = results[i].resultid % RG2.GPS_RESULT_OFFSET
    if (results[i].resultid === routes[j].id) {
      results[i].rawx = routes[j].x
      results[i].rawy = routes[j].y
      j = j + 1
      if (j === routes.length) {
        break
      }
    } else {
      results[i].rawx = []
      results[i].rawy = []
    }
  }
  return results
}

function sortByCourseIDThenResultID(a, b) {
  // sorts GPS results to be immediately after the associated main id
  if (a.courseid > b.courseid) {
    return 1
  }
  if (b.courseid > a.courseid) {
    return -1
  }
  if (a.rawid === b.rawid) {
    return a.resultid - b.resultid
  }
  return a.rawid - b.rawid
}

function getInitials(name) {
  // converts name to initials
  if (name === null) {
    return "??"
  }
  // replace GPS with * so that we get *SE rather than GSE for initials
  name = name.trim().replace(/GPS/g, '*')
  let initials = ""
  let addNext = true
  for (let i = 0; i < name.length; i += 1) {
    if (addNext) {
      initials += name.substr(i, 1)
      addNext = false
    }
    if (name.charAt(i) === " ") {
      addNext = true
    }
  }
  return initials
}

function expandAPITrack(raw) {
  // takes rawx or rawy strings from the API and converts them to x and y co-ordinates
  if (raw.length === 0) {
    return []
  }
  let track = raw.split(",").map((n) => {
    return parseInt(n, 10)
  })
  // co-ords sent as differences, so recreate absolute values
  for (let i = 1; i < track.length; i += 1) {
    track[i] = track[i - 1] + track[i]
  }
  return track
}

function expandRoute(result, course, format) {

  if (result.isGPSTrack) {
    result = expandGPSTrack(result)
  } else {
    if (format === RG2.EVENT_WITHOUT_RESULTS) {
      result = expandTrackWithNoSplits(result, course)
    } else {
      result = expandNormalTrack(result, course)
    }
  }
  result.hasValidTrack = true
  return result
}

function expandGPSTrack(result) {
  // in theory we get one point every three seconds
  for (let t = 0; t < result.x.length; t += 1) {
    result.xysecs[t] = 3 * t
  }
  return result
}

function expandNormalTrack(result, course) {
  // add times and distances at each position
  result.xysecs[0] = 0
  // each person has their own defined score course
  if (result.isScoreEvent) {
    // TODO score courses
    course.x = this.scorex
    course.y = this.scorey
  }
  calculateTrackTimes(result, course)
  return result
}

function expandTrackWithNoSplits(result, course) {
  // based on ExpandNormalTrack, but deals with event format 2: no results
  // this means we have a course and a finish time but no split times
  // only have finish time, which is in [1] at present
  let totaltime = result.splits[1]
  let currenttime = 0
  result.xysecs[0] = 0
  // get course details: can't be a score course since they aren't supported for format 2
  let nextcontrol = 1
  let nextx = course.x[nextcontrol]
  let nexty = course.y[nextcontrol]
  let lastx = course.x[course.x.length - 1]
  let lasty = course.y[course.y.length - 1]
  // add finish location to track just in case...
  result.x.push(lastx)
  result.y.push(lasty)
  let previouscontrolindex = 0
  result.cumulativeDistance = calculateTotalTrackLength(result.x, result.y)
  let totaldist = result.cumulativeDistance[result.cumulativeDistance.length - 1]
  // read through track to generate splits
  let x = 0
  let y = 0
  let moved = false
  for (let i = 1; i < result.x.length; i += 1) {
    x = result.x[i]
    y = result.y[i]
    // cope with routes that have start and finish in same place, and where the first point in a route is a repeat of the start
    if ((x !== result.x[0]) || (y !== result.y[0])) {
      moved = true
    }
    // track ends at control, as long as we have moved away from the start
    if ((nextx === x) && (nexty === y) && moved) {
      currenttime = parseInt((result.cumulativeDistance[i] / totaldist) * totaltime, 10)
      result.xysecs[i] = currenttime
      result.splits[nextcontrol] = currenttime
      result.xysecs = addInterpolatedTimes(result.xysecs, previouscontrolindex, i, result.cumulativeDistance)
      previouscontrolindex = i
      nextcontrol += 1
      if (nextcontrol === course.x.length) {
        // we have found all the controls
        break
      }
      nextx = course.x[nextcontrol]
      nexty = course.y[nextcontrol]
    }
  }
  return result
}

function calculateTrackTimes(result, course) {
  let cumulativeDistance = []
  cumulativeDistance[0] = 0
  let nextcontrol = getNextValidControl(0, result.splits)
  let nextx = course.x[nextcontrol]
  let nexty = course.y[nextcontrol]
  let dist = 0
  let oldx = result.x[0]
  let oldy = result.y[0]
  let x = 0
  let y = 0
  let previouscontrolindex = 0
  // read through list of controls and copy in split times
  // we are assuming the track starts at the start which is index 0...
  // look at each track point and see if it matches the next control location
  for (let i = 1; i < result.x.length; i += 1) {
    // calculate distance while we are looping through
    x = result.x[i]
    y = result.y[i]
    dist += Utils.getDistanceBetweenPoints(x, y, oldx, oldy)
    cumulativeDistance[i] = Math.round(dist)
    oldx = x
    oldy = y
    // track ends at control
    if ((nextx === x) && (nexty === y)) {
      result.xysecs[i] = result.splits[nextcontrol]
      result.xysecs = addInterpolatedTimes(result.xysecs, previouscontrolindex, i, cumulativeDistance)
      previouscontrolindex = i
      nextcontrol = getNextValidControl(nextcontrol, result.splits)
      if (nextcontrol === course.x.length) {
        // we have found all the controls
        break
      }
      nextx = course.x[nextcontrol]
      nexty = course.y[nextcontrol]
    }
  }
  return result
}

function getNextValidControl(thisControl, splits) {
  // look through splits to find next control which has a split time
  // to allow drawing for missed controls where the split time is 0
  var i
  for (i = thisControl + 1; i < splits.length; i += 1) {
    if (splits[i] !== splits[i - 1]) {
      return i
    }
  }
  // implies we have no finish time which is unlikely but anyway...
  return splits.length
}

function addInterpolatedTimes(xysecs, startindex, endindex, cumulativeDistance) {
  // add interpolated time at each point based on cumulative distance this assumes uniform speed...
  const oldt = xysecs[startindex]
  const deltat = xysecs[endindex] - oldt
  const olddist = cumulativeDistance[startindex]
  const deltadist = cumulativeDistance[endindex] - olddist
  for (let i = startindex; i <= endindex; i += 1) {
    xysecs[i] = oldt + Math.round(((cumulativeDistance[i] - olddist) * deltat / deltadist))
  }
  return xysecs
}

function calculateTotalTrackLength(x, y) {
  // read through track to find total distance
  let cumulativeDistance = []
  cumulativeDistance[0] = 0
  let oldx = x[0]
  let oldy = y[0]
  for (let i = 1; i < x.length; i += 1) {
    cumulativeDistance[i] = cumulativeDistance[i - 1] + Math.round(Utils.getDistanceBetweenPoints(x[i], y[i], oldx, oldy))
    oldx = x[i]
    oldy = y[i]
  }
  return cumulativeDistance
}

export default results
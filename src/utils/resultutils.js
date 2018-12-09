import RG2 from '../rg2Constants.js';
import he from 'he';
import Utils from './rg2utils.js';
import Course from './courseutils.js';

// functions related to the results state object
// Attributes
// canDelete: false              route can be deleted by this user
// colour: null
// courseid: 1                   NOT index into courses
// coursename: "Blue" 
// displayScoreCourse: false     ??
// displayTrack: false           user has selected to display track
// hasValidTrack: false          route has been expanded successfully?? 
// initials: "SE"
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

export default class {
  static processResults(oldResults, routes, courses, format) {
    // TODO Events with no results
    let results = this.combineResults(oldResults, routes);
    let scorecodes = [];
    let scorex = [];
    let scorey = [];
    let variant;
    // extract score course details if necessary
    if (format === RG2.SCORE_EVENT) {
      // details are only sent the first time a variant occurs (to reduce file size quite a lot in some cases)
      // so need to extract them for use later
      for (let i = 0; i < results.length; i += 1) {
        variant = results[i].variant;
        if (scorecodes[variant] === undefined) {
          scorecodes[variant] = results[i].scorecodes;
          scorex[variant] = results[i].scorex;
          scorey[variant] = results[i].scorey;
        }
      }
    }
    for (let i = 0; i < results.length; i += 1) {
      // modify fields from API as necessary
      // get round iconv problem in API: unescape special characters to get sensible text
      if (results[i].comments) {
        results[i].comments = he.decode(results[i].comments);
      } else {
        results[i].comments = "";
      }
      if (results[i].coursename === "") {
        results[i].coursename = Course.getCourseNameByID(courses, results[i].courseid);
      }
      results[i].name = he.decode(results[i].name);
      results[i].splits = this.adjustRawSplits(results[i].splits, results[i].time);

      // add extra detail to each result
      results[i].canDelete = false;
      results[i].colour = null;
      results[i].displayTrack = false;
      results[i].displayTrack = false;
      results[i].displayScoreCourse = false;
      results[i].hasValidTrack = false;
      results[i].initials = this.getInitials(results[i].name);
      if (results[i].resultid >= RG2.GPS_RESULT_OFFSET) {
        results[i].isGPSTrack = true;
      } else {
        results[i].isGPSTrack = false;
      }
      results[i].isScoreEvent = format === RG2.SCORE_EVENT;
      results[i].legpos = [];
      results[i].racepos = [];
      results[i].rawid = results[i].resultid % RG2.GPS_RESULT_OFFSET;
      results[i].replay = false;
      results[i].showResult = true;
      results[i].token = 0;
      results[i].x = this.expandAPITrack(results[i].rawx);
      results[i].y = this.expandAPITrack(results[i].rawy);
      results[i].speedColour = [];
      results[i].xysecs = [];
      delete results[i].delete;
      delete results[i].rawx;
      delete results[i].rawy;
      if (format === RG2.SCORE_EVENT) {
        // save control locations for score course result
        results[i].scorex = scorex[results[i].variant];
        results[i].scorey = scorey[results[i].variant];
        results[i].scorecodes = scorecodes[results[i].variant];
      }
      if (results[i].x.length > 0) {
        let course = courses.find(course => course.name === results[i].coursename);
        results[i].colour = RG2.COLOURS[results[i].rawid % RG2.COLOURS.length];
        results[i] = this.expandRoute(results[i], course, format);
      }
    }
    //this.setDeletionInfo();
    //this.sanitiseSplits();
    //this.generateLegPositions();
    return results;
  }

  static adjustRawSplits(rawSplits) {
    // insert a 0 split at the start to make life much easier elsewhere
    rawSplits.splice(0, 0, 0);
    // splits are time in seconds at control, but may have 0 for missing controls
    // make life easier elsewhere by replacing 0 with time at previous control
    for (let i = 1; i < rawSplits.length; i += 1) {
      if (rawSplits[i] === 0) {
        rawSplits[i] = rawSplits[i - 1];
      }
    }
    return rawSplits;
  }

  static combineResults(oldResults, routes) {
    let results = this.mergeRoutes(oldResults, routes);
    // want to avoid extra results line for GPS routes if there is no drawn route
    // first sort so that GPS routes come after initial result
    results.sort(this.sortByCourseIDThenResultID);
    // now we can combine first GPS route with original result if needed
    let oldID = undefined;
    let canCombine = false;
    for (let i = 0; i < results.length; i += 1) {
      results[i].delete = false;
      if (results[i].rawid === oldID) {
        // second or subsequent route for this result
        if (canCombine) {
          if (results[i].rawx.length > 0) {
            // found a route to combine
            results[i - 1].delete = true;
            // copy missing details to GPS route
            results[i].position = results[i - 1].position;
            results[i].splits = results[i - 1].splits;
            results[i].status = results[i - 1].status;
            results[i].time = results[i - 1].time;
            canCombine = false;
          }
        }
      } else {
        // this is the original result which can be combined if
        // it doesn't already have a drawn route, indicated by at least one point in the rawx array
        canCombine = results[i].rawx.length === 0;
        oldID = results[i].rawid;
      }
    }
    return results.filter(result => result.delete === false);
  }
  static mergeRoutes(oldResults, routes) {
    // adds routes to the relevant result
    // should really get the API to do this at a later stage...
    if (routes.length === 0) {
      return oldResults;
    }
    let results = oldResults.sort(function (a, b) {
      return a.resultid - b.resultid;
    });
    routes.sort(function (a, b) {
      return a.id - b.id;
    });
    let j = 0;
    for (let i = 0; i < results.length; i += 1) {
      results[i].rawid = results[i].resultid % RG2.GPS_RESULT_OFFSET;
      if (results[i].resultid === routes[j].id) {
        results[i].rawx = routes[j].x;
        results[i].rawy = routes[j].y;
        j = j + 1;
        if (j === routes.length) {
          break;
        }
      } else {
        results[i].rawx = [];
        results[i].rawy = [];
      }
    }
    return results;
  }

  static sortByCourseIDThenResultID(a, b) {
    // sorts GPS results to be immediately after the associated main id
    if (a.courseid > b.courseid) {
      return 1;
    }
    if (b.courseid > a.courseid) {
      return -1;
    }
    if (a.rawid === b.rawid) {
      return a.resultid - b.resultid;
    }
    return a.rawid - b.rawid;
  }

  static getInitials(name) {
    // converts name to initials
    if (name === null) {
      return "??";
    }
    // replace GPS with * so that we get *SE rather than GSE for initials
    name = name.trim().replace(/GPS/g, '*');
    let initials = "";
    let addNext = true;
    for (let i = 0; i < name.length; i += 1) {
      if (addNext) {
        initials += name.substr(i, 1);
        addNext = false;
      }
      if (name.charAt(i) === " ") {
        addNext = true;
      }
    }
    return initials;
  }

  static expandAPITrack(raw) {
    // takes rawx or rawy strings from the API and converts them to x and y co-ordinates
    if (raw.length === 0) {
      return [];
    }
    let track = raw.split(",").map((n) => {
      return parseInt(n, 10);
    });
    // co-ords sent as differences, so recreate absolute values
    for (let i = 1; i < track.length; i += 1) {
      track[i] = track[i - 1] + track[i];
    };
    return track;
  }

  static expandRoute(result, course, format) {

    if (result.isGPSTrack) {
      result = this.expandGPSTrack(result);
    } else {
      if (format === RG2.EVENT_WITHOUT_RESULTS) {
        result = this.expandTrackWithNoSplits(result, course);
      } else {
        result = this.expandNormalTrack(result, course);
      }
    }
    result.hasValidTrack = true;
    return result;
  }

  static expandGPSTrack(result) {
    // in theory we get one point every three seconds
    for (let t = 0; t < result.x.length; t += 1) {
      result.xysecs[t] = 3 * t;
    }
    return result;
  }

  static expandNormalTrack(result, course) {
    // add times and distances at each position
    result.xysecs[0] = 0;
    // each person has their own defined score course
    if (result.isScoreEvent) {
      // TODO score courses
      course.x = this.scorex;
      course.y = this.scorey;
    }
    this.calculateTrackTimes(result, course);
    return result;
  }

  static expandTrackWithNoSplits(result, course) {
    // based on ExpandNormalTrack, but deals with event format 2: no results
    // this means we have a course and a finish time but no split times
    // only have finish time, which is in [1] at present
    let totaltime = result.splits[1];
    let currenttime = 0;
    result.xysecs[0] = 0;
    // get course details: can't be a score course since they aren't supported for format 2
    let nextcontrol = 1;
    let nextx = course.x[nextcontrol];
    let nexty = course.y[nextcontrol];
    let lastx = course.x[course.x.length - 1];
    let lasty = course.y[course.y.length - 1];
    // add finish location to track just in case...
    result.x.push(lastx);
    result.y.push(lasty);
    let previouscontrolindex = 0;
    result.cumulativeDistance = this.calculateTotalTrackLength(result.x, result.y);
    let totaldist = result.cumulativeDistance[result.cumulativeDistance.length - 1];
    // read through track to generate splits
    let x = 0;
    let y = 0;
    let moved = false;
    for (let i = 1; i < result.x.length; i += 1) {
      x = result.x[i];
      y = result.y[i];
      // cope with routes that have start and finish in same place, and where the first point in a route is a repeat of the start
      if ((x !== result.x[0]) || (y !== result.y[0])) {
        moved = true;
      }
      // track ends at control, as long as we have moved away from the start
      if ((nextx === x) && (nexty === y) && moved) {
        currenttime = parseInt((result.cumulativeDistance[i] / totaldist) * totaltime, 10);
        result.xysecs[i] = currenttime;
        result.splits[nextcontrol] = currenttime;
        result.xysecs = this.addInterpolatedTimes(result.xysecs, previouscontrolindex, i, result.cumulativeDistance);
        previouscontrolindex = i;
        nextcontrol += 1;
        if (nextcontrol === course.x.length) {
          // we have found all the controls
          break;
        }
        nextx = course.x[nextcontrol];
        nexty = course.y[nextcontrol];
      }
    }
    return result;
  }

  static calculateTrackTimes(result, course) {
    let cumulativeDistance = [];
    cumulativeDistance[0] = 0;
    let nextcontrol = this.getNextValidControl(0, result.splits);
    let nextx = course.x[nextcontrol];
    let nexty = course.y[nextcontrol];
    let dist = 0;
    let oldx = result.x[0];
    let oldy = result.y[0];
    let x = 0;
    let y = 0;
    let previouscontrolindex = 0;
    // read through list of controls and copy in split times
    // we are assuming the track starts at the start which is index 0...
    // look at each track point and see if it matches the next control location
    for (let i = 1; i < result.x.length; i += 1) {
      // calculate distance while we are looping through
      x = result.x[i];
      y = result.y[i];
      dist += Utils.getDistanceBetweenPoints(x, y, oldx, oldy);
      cumulativeDistance[i] = Math.round(dist);
      oldx = x;
      oldy = y;
      // track ends at control
      if ((nextx === x) && (nexty === y)) {
        result.xysecs[i] = result.splits[nextcontrol];
        result.xysecs = this.addInterpolatedTimes(result.xysecs, previouscontrolindex, i, cumulativeDistance);
        previouscontrolindex = i;
        nextcontrol = this.getNextValidControl(nextcontrol, result.splits);
        if (nextcontrol === course.x.length) {
          // we have found all the controls
          break;
        }
        nextx = course.x[nextcontrol];
        nexty = course.y[nextcontrol];
      }
    }
    return result;
  }

  static getNextValidControl(thisControl, splits) {
    // look through splits to find next control which has a split time
    // to allow drawing for missed controls where the split time is 0
    var i;
    for (i = thisControl + 1; i < splits.length; i += 1) {
      if (splits[i] !== splits[i - 1]) {
        return i;
      }
    }
    // implies we have no finish time which is unlikely but anyway...
    return splits.length;
  }

  static addInterpolatedTimes(xysecs, startindex, endindex, cumulativeDistance) {
    // add interpolated time at each point based on cumulative distance; this assumes uniform speed...
    const oldt = xysecs[startindex];
    const deltat = xysecs[endindex] - oldt;
    const olddist = cumulativeDistance[startindex];
    const deltadist = cumulativeDistance[endindex] - olddist;
    for (let i = startindex; i <= endindex; i += 1) {
      xysecs[i] = oldt + Math.round(((cumulativeDistance[i] - olddist) * deltat / deltadist));
    }
    return xysecs;
  }

  static calculateTotalTrackLength(x, y) {
    // read through track to find total distance
    let cumulativeDistance = [];
    cumulativeDistance[0] = 0;
    let oldx = x[0];
    let oldy = y[0];
    for (let i = 1; i < x.length; i += 1) {
      cumulativeDistance[i] = cumulativeDistance[i - 1] + Math.round(Utils.getDistanceBetweenPoints(x[i], y[i], oldx, oldy));
      oldx = x[i];
      oldy = y[i];
    }
    return cumulativeDistance;
  }
}

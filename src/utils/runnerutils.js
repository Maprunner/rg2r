//import RG2 from '../rg2Constants.js';
import Utils from './rg2utils.js';
import RG2 from '../rg2Constants.js';

export default class {
  // functions related to the runners state object
  // idx is index of result in runners state array
  static toggleRunner(isChecked, runners, result, course, idx) {
    let runner;
    if (isChecked) {
      runner = this.addRunner(result, course, idx);
      runners.push(runner);

    } else {
      // remove runner
      runners = runners.filter(runner => runner.idx !== idx);
    }
    return runners;
  }

  static addRunner(result, course, idx) {
    let runner = {};
    runner.idx = idx;
    runner.name = result.name;
    runner.initials = result.initials;
    runner.starttime = result.starttime;
    runner.splits = result.splits;
    runner.legpos = result.legpos;
    // runner.colour = rg2.colours.getNextColour();
    // get course details
    if (result.isScoreEvent) {
      course = {};
      course.name = result.coursename;
      course.x = result.scorex;
      course.y = result.scorey;
      course.codes = result.scorecodes;
    }
    runner.coursename = course.name;
    // used to stop runners when doing replay by control
    runner.nextStopTime = RG2.VERY_HIGH_TIME_IN_SECS;
    // map position x,y indexed by running time in seconds
    runner.x = [];
    runner.y = [];

    // total distance travelled indexed by running time in seconds
    // in metres if georeferenced, otherwise in pixels
    runner.cumulativeDistance = [];
    runner.cumulativeDistance[0] = 0;

    // distance travelled for a leg indexed by control number
    runner.legTrackDistance = [];
    runner.legTrackDistance[0] = 0;

    // total distance travelled at end of leg indexed by control number
    runner.cumulativeTrackDistance = [];
    runner.cumulativeTrackDistance[0] = 0;

    if (result.hasValidTrack) {
      runner = this.expandTrack(runner, result.x, result.y, result.xysecs);
    } else {
      // no track so use straight line between controls
      runner = this.expandTrack(runner, course.x, course.y, result.splits);
    }
    runner = this.addTrackDistances(runner, course);

    return runner;
  }

  static addTrackDistances(runner, course) {
    // add track distances for each leg
    var control, ind, lastPointIndex;
    lastPointIndex = runner.cumulativeDistance.length - 1;
    if (course.codes !== undefined) {
      // if we got no splits then there will just be a finish time
      if (runner.splits.length > 1) {
        for (control = 1; control < course.codes.length; control += 1) {
          // avoid NaN values for GPS tracks that are shorter than the result time
          if (runner.splits[control] <= lastPointIndex) {
            ind = runner.splits[control];
          } else {
            ind = lastPointIndex;
          }
          runner.cumulativeTrackDistance[control] = runner.cumulativeDistance[ind];
          runner.legTrackDistance[control] = runner.cumulativeTrackDistance[control] - runner.cumulativeTrackDistance[control - 1];
        }
      } else {
        // allows for tracks at events with no results so no splits: just use start and finish
        runner.legTrackDistance[1] = runner.cumulativeDistance[lastPointIndex];
        runner.cumulativeTrackDistance[1] = runner.cumulativeDistance[lastPointIndex];
      }
    }
    return runner;
  }

  static expandTrack(runner, x, y, time) {
    // gets passed arrays of x, y and time
    // iterate over item which will be xy or controls
    var item, diffx, diffy, difft, t, diffdist, tox, toy, dist, timeatprevitem, timeatitem, fromx, fromy, fromdist, metresPerPixel;
    timeatprevitem = 0;
    timeatitem = 0;
    fromx = x[0];
    fromy = y[0];
    fromdist = 0;
    dist = 0;
    runner.x[0] = x[0];
    runner.y[0] = y[0];
    //let metresPerPixel = rg2.events.getMetresPerPixel();
    if (metresPerPixel === undefined) {
      metresPerPixel = 1;
    }
    for (item = 1; item < time.length; item += 1) {
      tox = x[item];
      toy = y[item];
      diffx = tox - fromx;
      diffy = toy - fromy;
      dist = dist + (Utils.getDistanceBetweenPoints(tox, toy, fromx, fromy) * metresPerPixel);
      diffdist = dist - fromdist;
      timeatitem = time[item];
      // allow for 0 splits indicating a missed control
      // just assume a 1 second split for now: probably harmless
      if (timeatitem === 0) {
        timeatitem = timeatprevitem + 1;
      }
      difft = timeatitem - timeatprevitem;
      for (t = timeatprevitem + 1; t < timeatitem; t += 1) {
        runner.x[t] = Math.round(fromx + ((t - timeatprevitem) * diffx / difft));
        runner.y[t] = Math.round(fromy + ((t - timeatprevitem) * diffy / difft));
        runner.cumulativeDistance[t] = Math.round(fromdist + ((t - timeatprevitem) * diffdist / difft));
      }
      runner.x[timeatitem] = tox;
      runner.y[timeatitem] = toy;
      runner.cumulativeDistance[timeatitem] = Math.round(dist);
      fromx = tox;
      fromy = toy;
      fromdist = dist;
      timeatprevitem = timeatitem;
    }
    return runner;
  }

}

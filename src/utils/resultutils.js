import RG2 from '../rg2Constants.js';
//import Utils from './rg2utils.js';

export default class {
  // functions related to the results state object
  static processResults(originalResults, isScoreEvent) {
    let results = originalResults;
    let scorecodes = [];
    let scorex = [];
    let scorey = [];
    let variant;
    // extract score course details if necessary
    if (isScoreEvent) {
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
    // modify each result
    for (let i = 0; i < results.length; i += 1) {
      if (isScoreEvent) {
        variant = results[i].variant;
      }
      results[i].rawid = results[i].resultid % RG2.GPS_RESULT_OFFSET;
      results[i].isScoreEvent = isScoreEvent;
      //results[i].name = rg2.he.decode(results[i].name);
      results[i].initials = this.getInitials(results[i].name);
      results[i].canDelete = false;
      results[i].showResult = true;
      results[i].onDisplay = false;
      results[i].token = 0;
      // get round iconv problem in API for now: unescape special characters to get sensible text
      //if (results[i].comments) {
      //  results[i].comments = rg2.he.decode(results[i].comments);
      //} else {
      //  results[i].comments = "";
      //}
      if (results[i].coursename === "") {
        // need to force this to be a string for use elsewhere
        results[i].coursename = results[i].courseid.toString();
      }
      //results[i].splits = this.adjustRawSplits(results[i].splits, results[i].time);

      if (isScoreEvent) {
        // save control locations for score course result
        results[i].scorex = scorex[results[i].variant];
        results[i].scorey = scorey[results[i].variant];
        results[i].scorecodes = scorecodes[results[i].variant];
      }
      //this.initialiseTrack(data);
    }
    //this.setDeletionInfo();
    //this.setScoreCourseInfo();
    //this.sanitiseSplits();
    //this.generateLegPositions();
    results.sort(this.sortByCourseIDThenResultID);
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
}

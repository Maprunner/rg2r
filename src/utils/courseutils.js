//import RG2 from '../rg2Constants.js';
import Utils from './rg2utils.js';

export default class {
  // functions related to the courses state object
  static processCourses(originalCourses, isScoreEvent) {
    let courses = originalCourses;
    for (let i = 0; i < courses.length; i += 1) {
      courses[i].display = false;
      courses[i].isScoreCourse = isScoreEvent;
      let c1x, c1y, c2x, c2y, c3x, c3y;
      courses[i].angle = [];
      courses[i].textAngle = [];
      for (let j = 0; j < (courses[i].xpos.length - 1); j += 1) {
        if (courses[i].isScoreCourse) {
          // align score event start triangle and controls upwards
          courses[i].angle[j] = 0;
          courses[i].textAngle[j] = 45;
        } else {
          // angle of line to next control
          courses[i].angle[j] = Utils.getAngle(courses[i].xpos[j], courses[i].ypos[j], courses[i].xpos[j + 1], courses[i].ypos[j + 1]);
          // create bisector of angle to position number
          c1x = Math.sin(courses[i].angle[j - 1]);
          c1y = Math.cos(courses[i].angle[j - 1]);
          c2x = Math.sin(courses[i].angle[j]) + c1x;
          c2y = Math.cos(courses[i].angle[j]) + c1y;
          c3x = c2x / 2;
          c3y = c2y / 2;
          courses[i].textAngle[j] = Utils.getAngle(c3x, c3y, c1x, c1y);
        }
      }
      // angle for finish aligns to north
      courses[i].angle[courses[i].xpos.length - 1] = 0;
      courses[i].textAngle[courses[i].xpos.length - 1] = 45;
    }
    return courses;
  }

  static extractControls(courses) {
    let codes;
    let controls = [];
    for (let i = 0; i < courses.length; i += 1) {
      if (courses[i] !== undefined) {
        codes = courses[i].codes;
        if (codes !== undefined) {
          for (let j = 0; j < codes.length; j += 1) {
            if (controls.find(control => control.code === codes[j]) !== -1) {
              controls.push({ code: codes[j], x: courses[i].xpos[j], y: courses[i].ypos[j] });
            }
          }
        }
      }
    }
    return controls;
  }
}

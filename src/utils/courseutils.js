//import RG2 from '../rg2Constants.js';
import Utils from './rg2utils.js';

export default class {
  // functions related to the courses state object
  static processCourses(originalCourses, isScoreEvent) {
    let courses = originalCourses;
    for (let i = 0; i < courses.length; i += 1) {
      courses[i].display = false;
      courses[i].isScoreCourse = isScoreEvent;
      courses[i].x = courses[i].xpos;
      courses[i].y = courses[i].ypos;
      delete courses[i].xpos;
      delete courses[i].ypos;
      let c1x, c1y, c2x, c2y, c3x, c3y;
      courses[i].angle = [];
      courses[i].textAngle = [];
      for (let j = 0; j < (courses[i].x.length - 1); j += 1) {
        if (courses[i].isScoreCourse) {
          // align score event start triangle and controls upwards
          courses[i].angle[j] = Math.PI * 1.5;
          courses[i].textAngle[j] = Math.PI * 1.5;
        } else {
          // angle of line to next control
          courses[i].angle[j] = Utils.getAngleBetweenPoints(courses[i].x[j], courses[i].y[j], courses[i].x[j + 1], courses[i].y[j + 1]);
          if (j > 0) {
            // create bisector of angle to position number
            c1x = Math.sin(courses[i].angle[j - 1]);
            c1y = Math.cos(courses[i].angle[j - 1]);
            c2x = Math.sin(courses[i].angle[j]) + c1x;
            c2y = Math.cos(courses[i].angle[j]) + c1y;
            c3x = c2x / 2;
            c3y = c2y / 2;
            courses[i].textAngle[j] = Utils.getAngleBetweenPoints(c3x, c3y, c1x, c1y);
          } else {
            courses[i].textAngle[0] = Math.PI * 1.5;
          }
        }
      }
      // angle for finish aligns to north
      courses[i].angle[courses[i].x.length - 1] = Math.PI * 1.5;
      courses[i].textAngle[courses[i].x.length - 1] = Math.PI * 1.5;
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
              controls.push({ code: codes[j], x: courses[i].x[j], y: courses[i].y[j] });
            }
          }
        }
      }
    }
    return controls;
  }
}

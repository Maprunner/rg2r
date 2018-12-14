import RG2 from '../rg2Constants.js';

export default class {
  static getDistanceBetweenPoints(x1, y1, x2, y2) {
    // Pythagoras
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

  static getAngleBetweenPoints(x1, y1, x2, y2) {
    // returns angle between points in radians relative to X axis
    let angle = Math.atan2((y2 - y1), (x2 - x1));
    if (angle < 0) {
      angle = angle + (2 * Math.PI);
    }
    return angle;
  }

  static getDegreesFromRadians(angle) {
    // convert from radians relative to X axis (East is 0)
    // to degrees relative to Y axis (N is 0)
    return ((angle / Math.PI) * 180) - 90;
  }

  static mergeXYArray(x, y) {
    // takes two arrays of equal length and merges them alternately into one
    // useful for <Line /> components
    const points = [];
    for (let i = 0; i < x.length; i += 1) {
      points.push(x[i]);
      points.push(y[i]);
    }
    return points;
  }

  // converts seconds to MM:SS
  static formatSecsAsMMSS(secs) {
    let minutes = Math.floor(secs / 60);
    let formattedtime = minutes;
    let seconds = secs - (minutes * 60);
    if (seconds < 10) {
      formattedtime += ":0" + seconds;
    } else {
      formattedtime += ":" + seconds;
    }
    return formattedtime;
  }

  // returns seconds as hh:mm:ss
  static formatSecsAsHHMMSS(secs) {
    let time;
    let hours = Math.floor(secs / 3600);
    if (hours < 10) {
      time = "0" + hours + ":";
    } else {
      time = hours + ":";
    }
    secs = secs - (hours * 3600);
    let minutes = Math.floor(secs / 60);
    if (minutes < 10) {
      time += "0" + minutes;
    } else {
      time += minutes;
    }
    secs = secs - (minutes * 60);
    if (secs < 10) {
      time += ":0" + secs;
    } else {
      time += ":" + secs;
    }
    return time;
  }

  static isScoreEvent(format) {
    return RG2.SCORE_EVENT === format;
  }
}

import RG2 from '../rg2Constants.js'

// returns seconds as hh:mm:ss
export function formatSecsAsHHMMSS(secs) {
  let time
  let hours = Math.floor(secs / 3600)
  if (hours < 10) {
    time = "0" + hours + ":"
  } else {
    time = hours + ":"
  }
  secs = secs - (hours * 3600)
  let minutes = Math.floor(secs / 60)
  if (minutes < 10) {
    time += "0" + minutes
  } else {
    time += minutes
  }
  secs = secs - (minutes * 60)
  if (secs < 10) {
    time += ":0" + secs
  } else {
    time += ":" + secs
  }
  return time
}

export function getAngleBetweenPoints(x1, y1, x2, y2) {
  // returns angle (-PI to PI) between points in radians clockwise relative to x axis
  // NB y axis has 0 at top of page and increases downwards which is why
  // values are clockwise rather than the expected anticlockwise from atan2 
  // 
  return Math.atan2((y2 - y1), (x2 - x1))
}

export function reverseAngle(angle) {
  if (angle < 0) {
    return angle + Math.PI
  }
  return angle - Math.PI
}

export function getDegreesFromRadians(angle) {
  // convert from radians relative to X axis (East is 0)
  // to degrees relative to Y axis (North is 0)
  return ((angle / Math.PI) * 180) - 90
}

export function getDistanceBetweenPoints(x1, y1, x2, y2) {
  // Pythagoras
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}

export function isScoreEvent(format) {
  return RG2.SCORE_EVENT === format
}

export function mergeXYArray(x, y) {
  // takes two arrays of equal length and merges them alternately into one
  // useful for <Line /> components
  const points = []
  for (let i = 0; i < x.length; i += 1) {
    points.push(x[i])
    points.push(y[i])
  }
  return points
}

export function t(dictionary, string) {
  if (dictionary.hasOwnProperty(string)) {
    return dictionary[string];
  }
  return string
}
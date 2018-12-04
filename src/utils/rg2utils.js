export default class {
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
}

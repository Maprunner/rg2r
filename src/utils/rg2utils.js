export default class {
  static getAngle(x1, y1, x2, y2) {
    let angle = Math.atan2((y2 - y1), (x2 - x1));
    if (angle < 0) {
      angle = angle + (2 * Math.PI);
    }
    // now have angle in radians relative to X axis
    // but we need angle in degrees relative to Y axis
    return (angle * 180 / Math.PI) + 90;
  }
}

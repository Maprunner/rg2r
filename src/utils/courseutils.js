export default class {

  static getCourseNameByID(courses, courseid) {
    for (let i = 0; i < courses.length; i += 1) {
      if (courses[i].courseid === courseid) {
        return courses[i].name;
      }
    }
    return courseid.toString();
  }

  static getCourseDetailsByID(courses, courseid) {
    for (let i = 0; i < courses.length; i += 1) {
      if (courses[i].courseid === courseid) {
        return courses[i];
      }
    }
    return {};
  }
}

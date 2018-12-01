import React, { Component } from 'react';
import { Checkbox } from 'primereact/checkbox';

function CourseItem({ course, onSelectCourse, id }) {
  return (
    <>
      <li>
        <Checkbox value={id} onChange={onSelectCourse} checked={course.display}></Checkbox>
        {" " + course.name}
      </li>
    </>
  )
}

function CourseList({ courses, onSelectCourse }) {
  const courseItems = courses.map((course, i) =>
    <CourseItem key={course.courseid.toString()} course={course} onSelectCourse={onSelectCourse} id={i} />
  );
  return (
    <ul>
      {courseItems}
    </ul>
  );
}

class Courses extends Component {
  render() {
    return (
      <div className="rg2-ul">
        <CourseList courses={this.props.courses} onSelectCourse={this.props.onSelectCourse} />
      </div>
    );
  }
}

export default Courses;
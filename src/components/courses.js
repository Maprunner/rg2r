import React, { Component } from 'react';
import { Checkbox } from 'primereact/checkbox';
import RG2 from '../rg2Constants';

function CourseItem({ name, checked, onSelectCourse, value }) {
  return (
    <>
      <li>
        <Checkbox value={value} onChange={onSelectCourse} checked={checked}></Checkbox>
        {" " + name}
      </li>
    </>
  )
}

function CourseList({ courses, onSelectCourse, display }) {
  const courseItems = courses.map((course, i) =>
    <CourseItem key={i.toString()} name={course.name} checked={display[i]} onSelectCourse={onSelectCourse} value={i} />
  );
  let allChecked = true;
  for (let i = 0; i < courses.length; i += 1) {
    if (!display[i]) {
      allChecked = false;
      break;
    }
  }
  // don't need a summary line if there is only one course
  if (courses.length > 1) {
    courseItems.push(<CourseItem key={courses.length.toString()} name={"All"} onSelectCourse={onSelectCourse} checked={allChecked} value={RG2.DISPLAY_ALL_COURSES} />);
  }

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
        <CourseList courses={this.props.courses} display={this.props.display} onSelectCourse={this.props.onSelectCourse} />
      </div>
    );
  }
}

export default Courses;
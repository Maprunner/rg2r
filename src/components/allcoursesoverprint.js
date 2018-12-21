import React, { Component } from 'react'
import SingleCourseOverprint from './SingleCourseOverprint.js'

class AllCoursesOverprint extends Component {
  render() {
    if (this.props.courses.length === 0) {
      return null
    }
    const courseOverprint = [];
    for (let i = 0; i < this.props.courses.length - 1; i += 1) {
      if (this.props.display[i]) {
        courseOverprint.push(<SingleCourseOverprint key={i} course={this.props.courses[i]} opt={this.props.opt} />)
      }
    }
    return (
      <>
        {courseOverprint}
      </>
    );
  }
}

export default AllCoursesOverprint

import React from 'react'
import SingleCourseOverprint from './SingleCourseOverprint.js'

function AllCoursesOverprint(props) {
  const {courses, display, opt} = props
  if (courses.length === 0) {
    return null
  }
  const courseOverprint = []
  for (let i = 0; i < courses.length; i += 1) {
    if (display[i]) {
      courseOverprint.push(<SingleCourseOverprint key={i} course={courses[i]} opt={opt} />)
    }
  }
  return (
    <>
      {courseOverprint}
    </>
  )
}

export default AllCoursesOverprint

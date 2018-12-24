import React from 'react'
import CourseItem from './CourseItem.js'
import CourseItemHeader from './CourseItemHeader.js'
import RG2 from '../rg2Constants'

function CourseDisplay({ courses, resultCount, routeCount, onSelectCourse,
  allRoutesDisplayed, allRoutesReplayed, onDisplayAllRoutes, onReplayAllRoutes, display }) {
  const courseItems = courses.map((course, i) =>
    <CourseItem
      key={i.toString()}
      name={course.name}
      resultCount={resultCount[i]}
      routeCount={routeCount[i]}
      checked={display[i]}
      onSelectCourse={onSelectCourse}
      onDisplayAllRoutes={onDisplayAllRoutes}
      onReplayAllRoutes={onReplayAllRoutes}
      allRoutesDisplayed={allRoutesDisplayed[i]}
      allRoutesReplayed={allRoutesReplayed[i]}
      index={i} />
  )
  // don't need a summary line if there is only one course
  if (courses.length > 1) {
    courseItems.push(<CourseItem
      key={courses.length.toString()}
      name={"All"}
      resultCount={resultCount[resultCount.length - 1]}
      routeCount={routeCount[routeCount.length - 1]}
      onSelectCourse={onSelectCourse}
      onDisplayAllRoutes={onDisplayAllRoutes}
      onReplayAllRoutes={onReplayAllRoutes}
      checked={display[resultCount.length - 1]}
      allRoutesDisplayed={allRoutesDisplayed[routeCount.length - 1]}
      allRoutesReplayed={allRoutesReplayed[routeCount.length - 1]}
      index={RG2.ALL_COURSES} />)
  }

  return (
    <div>
      <table>
        <thead>
          <CourseItemHeader />
        </thead>
        <tbody>
          {courseItems}
        </tbody>
      </table>
    </div>
  )
}

export default CourseDisplay
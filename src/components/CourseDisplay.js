import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RG2 from '../rg2Constants'

function CourseItem({ name, checked, resultCount, routeCount, onSelectCourse,
  allRoutesDisplayed, allRoutesReplayed, onDisplayAllRoutes, onReplayAllRoutes, index }) {
  return (
    <tr>
      <td>{name}</td>
      <td><Checkbox value={index} onChange={onSelectCourse} checked={checked}></Checkbox></td>
      <td className="center-text">{resultCount}</td>
      <td className="center-text">{routeCount}</td>
      <td>{routeCount > 0 ?
        <Checkbox
          value={RG2.ALL_ROUTES}
          name={index.toString()}
          onChange={onDisplayAllRoutes}
          checked={allRoutesDisplayed}>
        </Checkbox> : null}</td>
      <td>{routeCount > 0 ?
        <Checkbox
          value={RG2.ALL_ROUTES}
          name={index.toString()}
          onChange={onReplayAllRoutes}
          checked={allRoutesReplayed}>
        </Checkbox> : null}</td>
    </tr>
  )
}

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
      checked={display[resultCount.length - 1]}
      allRoutesDisplayed={allRoutesDisplayed[routeCount.length - 1]}
      allRoutesReplayed={allRoutesReplayed[routeCount.length - 1]}
      index={RG2.ALL_COURSES} />)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th><FontAwesomeIcon icon={'eye'} /></th>
            <th>Runners</th>
            <th>Routes</th>
            <th><FontAwesomeIcon icon={'eye'} /></th>
            <th><FontAwesomeIcon icon={'play'} /></th></tr>
        </thead>
        <tbody>
          {courseItems}
        </tbody>
      </table>
    </div>
  )
}

export default CourseDisplay
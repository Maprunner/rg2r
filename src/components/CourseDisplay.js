import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RG2 from '../rg2Constants'

function CourseItem({ name, checked, resultCount, routeCount, onSelectCourse, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td><Checkbox value={value} onChange={onSelectCourse} checked={checked}></Checkbox></td>
      <td>{resultCount}</td>
      <td>{routeCount}</td>
      <td>{routeCount > 0 ? <Checkbox value={value} onChange={onSelectCourse} checked={checked}></Checkbox> : null}</td>
      <td>{routeCount > 0 ? <Checkbox value={value} onChange={onSelectCourse} checked={checked}></Checkbox> : null}</td>
    </tr>
  )
}

function CourseDisplay({ courses, resultCount, routeCount, onSelectCourse, display }) {
  const courseItems = courses.map((course, i) =>
    <CourseItem
      key={i.toString()}
      name={course.name}
      resultCount={resultCount[i]}
      routeCount={routeCount[i]}
      checked={display[i]}
      onSelectCourse={onSelectCourse}
      value={i} />
  )
  // don't need a summary line if there is only one course
  if (courses.length > 1) {
    courseItems.push(<CourseItem
      key={courses.length.toString()}
      name={"All"}
      resultCount={resultCount[resultCount.length - 1]}
      routeCount={routeCount[routeCount.length - 1]}
      onSelectCourse={onSelectCourse}
      checked={display[resultCount.length - 1]}
      value={RG2.DISPLAY_ALL_COURSES} />)
  }

  return (
    <div className="rg2-ul">
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
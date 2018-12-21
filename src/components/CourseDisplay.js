import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import RG2 from '../rg2Constants';

function CourseItem({ name, checked, results, routes, onSelectCourse, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td><Checkbox value={value} onChange={onSelectCourse} checked={checked}></Checkbox></td>
      <td>{results}</td>
      <td>{routes}</td>
      <td></td>
      <td></td>
    </tr>
  )
}

function CourseDisplay({ courses, results, routes, onSelectCourse, display }) {
  const courseItems = courses.map((course, i) =>
    <CourseItem key={
      i.toString()}
      name={course.name}
      results={results[i]}
      routes={routes[i]}
      checked={display[i]} 
      onSelectCourse={onSelectCourse} 
      value={i} />
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
    courseItems.push(<CourseItem 
      key={courses.length.toString()} 
      name={"All"} 
      results={results[results.length - 1]}
      routes={routes[routes.length - 1]}
      onSelectCourse={onSelectCourse} 
      checked={allChecked} 
      value={RG2.DISPLAY_ALL_COURSES} />);
  }

  return (
    <div className="rg2-ul">
    <table>
        <thead>
          <tr><th>Course</th><th></th><th>Runners</th><th>Routes</th><th></th><th></th></tr>
        </thead>
        <tbody>
          {courseItems}
          {/* <SummaryRow
            courseName={courseName}
            onSelect={onSelectCourse}
            onReplay={onReplay}
            routesChecked={allRoutesDisplayed}
            replayChecked={allRoutesReplayed}
            hasRoutes={hasRoutes} /> */}
        </tbody>
      </table>
      </div>
  );
}

export default CourseDisplay;
import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import VisibleCourseResultList from '../containers/VisibleCourseResultList';

function FullResultList({ courses }) {
  let fullResultList = [];
  let courseResults;
  for (let i = 0; i < courses.length; i += 1) {
    courseResults = <VisibleCourseResultList key={i} courseIndex={i} />
    fullResultList.push(<AccordionTab key={i} header={courses[i].name} >{courseResults}</AccordionTab>);
  }
  // <VisibleCourseResultList key={i} courseIndex={i} />
  //fullResultList.push(<AccordionTab key={courses.length} header={oldCourseName} >{resultListForCourse}</AccordionTab>);
  return (
    <Accordion >
      {fullResultList}
    </Accordion >
  )
}

export default FullResultList;
import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import VisibleCourseResultList from '../containers/VisibleCourseResultList';

function ResultDisplay({ courses }) {
  let fullResultList = [];
  let courseResults;
  for (let i = 0; i < courses.length; i += 1) {
    courseResults = <VisibleCourseResultList key={i} courseIndex={i} />
    fullResultList.push(<AccordionTab key={i} header={courses[i].name} >{courseResults}</AccordionTab>);
  }
  return (
    <Accordion >
      {fullResultList}
    </Accordion >
  )
}

export default ResultDisplay;
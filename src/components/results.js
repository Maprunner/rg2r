import React, { Component } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Accordion, AccordionTab } from 'primereact/accordion';
import RG2 from '../rg2Constants';

function ResultItem({ result, i, onSelect }) {
  // allow for result being filtered out
  if (result.showResult) {
    let displayRoute;
    if (result.x.length > 0) {
      displayRoute = <Checkbox value={i} name={result.coursename} onChange={onSelect} checked={result.displayTrack} />;
    } else {
      displayRoute = <></>
    }
    return (
      <>
        <tr>
          <td>{result.position}</td>
          <td>{result.name}</td>
          <td>{result.time}</td>
          <td>{displayRoute}</td>
        </tr>
      </>
    )
  } else {
    return null;
  }
}

const SummaryRow = ({ courseName, onSelect, checked }) => (
  <>
    <tr><td></td><td>All</td><td></td><td>
      <Checkbox value={RG2.DISPLAY_ALL_ROUTES_FOR_COURSE} name={courseName} onChange={onSelect} checked={checked} />
    </td></tr>
  </>
)

function ResultListForCourse({ results, name, onSelect, startAt }) {
  const resultsList = results.map((result, i) => <ResultItem key={i.toString()} onSelect={onSelect} result={result} i={i + startAt} />);
  let allChecked = true;
  let hasTracks = false;
  let summaryRow;
  for (let i = 0; i < results.length; i += 1) {
    if (results[i].x.length > 0) {
      hasTracks = true;
      if (!results[i].displayTrack) {
        allChecked = false;
        break;
      }
    }
  }
  if (hasTracks) {
    summaryRow = <SummaryRow courseName={name} onSelect={onSelect} checked={allChecked} />
  } else {
    summaryRow = null;
  }

  return (
    <>
      <table>
        <thead>
          <tr><th></th><th>Name</th><th>Time</th><th></th></tr>
        </thead>
        <tbody>
          {resultsList}
          {summaryRow}
        </tbody>
      </table>
    </>
  );
}

class Results extends Component {
  render() {
    const courses = this.props.courses;
    const results = this.props.results;
    let resultListForCourse;
    let fullResultList = [];
    let courseResults = [];
    let key = 0;
    let oldCourseName = results[0].coursename;
    let startAt = 0;
    // assume for now that results are sorted by course and in required order within course
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].coursename !== oldCourseName) {
        resultListForCourse = <ResultListForCourse startAt={startAt} key={key} name={oldCourseName} results={courseResults.slice()} onSelect={this.props.onSelectResult} />;
        fullResultList.push(<AccordionTab key={i} header={oldCourseName}>{resultListForCourse}</AccordionTab>);
        key = key + 1;
        courseResults.length = 0;
        oldCourseName = results[i].coursename;
        startAt = i;
      }
      courseResults.push(results[i]);
    }
    resultListForCourse = <ResultListForCourse key={key} name={oldCourseName} startAt={startAt} results={courseResults} onSelect={this.props.onSelectResult} />;
    fullResultList.push(<AccordionTab key={courses.length} header={oldCourseName} >{resultListForCourse}</AccordionTab>);

    return (
      <Accordion>
        {fullResultList}
      </Accordion>
    );
  }
}

export default Results;
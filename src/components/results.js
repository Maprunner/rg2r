import React, { Component } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Accordion, AccordionTab } from 'primereact/accordion';
import RG2 from '../rg2Constants';

function ResultItem({ result, i, onSelect }) {
  return (
    <>
      <tr>
        <td>{result.position}</td>
        <td>{result.name}</td>
        <td>{result.time}</td>
        <td><Checkbox value={i} name={result.coursename} onChange={onSelect} checked={result.onDisplay} /></td>
      </tr>
    </>
  )
}

function ResultListForCourse({ results, onSelect }) {
  const resultsList = results.map((result, i) => <ResultItem key={i.toString()} onSelect={onSelect} result={result} i={i} />);
  let allChecked = true;
  for (let i = 0; i < results.length; i += 1) {
    if (!results[i].onDisplay) {
      allChecked = false;
      break;
    }
  }
  return (
    <>
      <table>
        <thead>
          <tr><th></th><th>Name</th><th>Time</th><th></th></tr>
        </thead>
        <tbody>
          {resultsList}
          <tr><td></td><td>All</td><td></td><td>
            <Checkbox value={RG2.DISPLAY_ALL_ROUTES_FOR_COURSE} name={results[0].coursename} onChange={onSelect} checked={allChecked} />
          </td></tr>
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
    // assume for now that results are sorted by course and in required order within course
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].coursename !== oldCourseName) {
        resultListForCourse = <ResultListForCourse header={i} key={key} name={oldCourseName} results={courseResults.slice()} onSelect={this.props.onSelectResult} />;
        fullResultList.push(<AccordionTab key={i} header={oldCourseName}>{resultListForCourse}</AccordionTab>);
        key = key + 1;
        courseResults.length = 0;
        oldCourseName = results[i].coursename;
      } else {
        courseResults.push(results[i]);
      }
    }
    resultListForCourse = <ResultListForCourse key={key} name={oldCourseName} results={courseResults} onSelect={this.props.onSelectResult} />;
    fullResultList.push(<AccordionTab key={courses.length} header={oldCourseName} >{resultListForCourse}</AccordionTab>);

    return (
      <Accordion>
        {fullResultList}
      </Accordion>
    );
  }
}

export default Results;
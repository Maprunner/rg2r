import React, { Component } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Accordion, AccordionTab } from 'primereact/accordion'
import RG2 from '../rg2Constants'

function ResultItem({ result, i, onSelect, onReplay }) {
  // allow for result being filtered out
  if (result.showResult) {
    let displayRoute
    if (result.x.length > 0) {
      displayRoute = <Checkbox value={i} name={result.coursename} onChange={onSelect} checked={result.displayTrack} />
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
          <td><Checkbox value={i} name={result.coursename} onChange={onReplay} checked={result.replay} /></td>
        </tr>
      </>
    )
  } else {
    return null
  }
}

function SummaryRow({ courseName, onSelect, onReplay, routesChecked, replayChecked, hasRoutes }) {
  let routes
  if (hasRoutes) {
    routes = <Checkbox
      value={RG2.DISPLAY_ALL_ROUTES_FOR_COURSE}
      name={courseName}
      onChange={onSelect}
      checked={routesChecked} />
  } else {
    routes = null
  }
  return (
    <>
      <tr><td></td><td>All</td><td></td><td>{routes}</td><td>
        <Checkbox value={RG2.REPLAY_ALL_ROUTES_FOR_COURSE} name={courseName} onChange={onReplay} checked={replayChecked} />
      </td></tr>
    </>
  )
}

function ResultListForCourse({ results, name, onSelect, onReplay, startAt }) {
  const resultsList = results.map((result, i) => <ResultItem key={i.toString()} onSelect={onSelect} onReplay={onReplay} result={result} i={i + startAt} />)
  let allReplayChecked = true
  let allRoutesChecked = true
  let hasRoutes = false
  for (let i = 0; i < results.length; i += 1) {
    if (!results[i].replay) {
      allReplayChecked = false
    }
    if (results[i].x.length > 0) {
      hasRoutes = true
      if (!results[i].displayTrack) {
        allRoutesChecked = false
      }
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr><th></th>
            <th>Name</th>
            <th>Time</th>
            <th><FontAwesomeIcon icon={'eye'} /></th>
            <th><FontAwesomeIcon icon={'play'} /></th>
          </tr>
        </thead>
        <tbody>
          {resultsList}
          <SummaryRow
            courseName={name}
            onSelect={onSelect}
            onReplay={onReplay}
            routesChecked={allRoutesChecked}
            replayChecked={allReplayChecked}
            hasRoutes={hasRoutes} />
        </tbody>
      </table>
    </>
  )
}

class Results extends Component {
  render() {
    const courses = this.props.courses
    const results = this.props.results
    let resultListForCourse
    let fullResultList = []
    let courseResults = []
    let key = 0
    let oldCourseName = results[0].coursename
    let startAt = 0
    // assume for now that results are sorted by course and in required order within course
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].coursename !== oldCourseName) {
        resultListForCourse = <ResultListForCourse
          startAt={startAt}
          key={key}
          name={oldCourseName}
          results={courseResults.slice()}
          onSelect={this.props.onSelectRoute}
          onReplay={this.props.onReplay} />
        fullResultList.push(<AccordionTab
          key={i}
          header={oldCourseName}>
          {resultListForCourse}
        </AccordionTab>)
        key = key + 1
        courseResults.length = 0
        oldCourseName = results[i].coursename
        startAt = i
      }
      courseResults.push(results[i])
    }
    resultListForCourse = <ResultListForCourse
      key={key}
      name={oldCourseName}
      startAt={startAt}
      results={courseResults}
      onSelect={this.props.onSelectRoute}
      onReplay={this.props.onReplay} />
    fullResultList.push(<AccordionTab key={courses.length} header={oldCourseName} >{resultListForCourse}</AccordionTab>)

    return (
      <Accordion>
        {fullResultList}
      </Accordion>
    )
  }
}

export default Results
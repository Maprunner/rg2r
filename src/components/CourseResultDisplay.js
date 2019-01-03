import React, { memo } from 'react'
import Card from 'react-bootstrap/lib/Card'
import Collapse from 'react-bootstrap/lib/Collapse'
import Form from 'react-bootstrap/lib/Form'
import ResultItem from '../components/ResultItem'
import SearchBox from './SearchBox'
import CourseResultSummaryRow from '../components/CourseResultSummaryRow'
import CourseResultHeaderRow from '../components/CourseResultHeaderRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CourseResultDisplay({ results, display, replay, courseIndex, filter, onSelect, 
  onReplay, onFilterChange, onShowResults,
  allRoutesDisplayed, allRoutesReplayed, hasRoutes, courseName, onSelectCourse, courseDisplay }) {
  const resultsList = results.map((result) => <ResultItem
    key={result.index.toString()}
    onSelect={onSelect}
    onReplay={onReplay}
    result={result}
    replay={replay[result.index]}
    display={display[result.index]} />)

  return (
    <Card style={{ minWidth: '360px' }}>
      <Card.Header className="clearflex">
        <div className="float-left" onClick={onShowResults}>
          <FontAwesomeIcon icon={'caret-right'} /> {courseName}
        </div>
        <div className="float-right">
          <Form.Check
            id={courseIndex}
            value={courseIndex}
            onChange={onSelectCourse}
            checked={courseDisplay[courseIndex]} />
        </div>
      </Card.Header>
      <Collapse in={false}>
        <Card.Body>
          <SearchBox
            filter={filter}
            onFilterChange={onFilterChange} />
          <table>
            <thead>
              <CourseResultHeaderRow />
            </thead>
            <tbody>
              {resultsList}
              <CourseResultSummaryRow
                courseIndex={courseIndex}
                onSelect={onSelect}
                onReplay={onReplay}
                routesChecked={allRoutesDisplayed}
                replayChecked={allRoutesReplayed}
                hasRoutes={hasRoutes} />
            </tbody>
          </table>
        </Card.Body>
      </Collapse>
    </Card>
  )
}

export default memo(CourseResultDisplay)
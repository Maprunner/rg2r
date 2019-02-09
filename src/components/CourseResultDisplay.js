import React, { memo } from 'react'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import ResultItem from '../components/ResultItem'
import SearchBox from './SearchBox'
import CourseResultSummaryRow from '../components/CourseResultSummaryRow'
import CourseResultHeaderRow from '../components/CourseResultHeaderRow'
import RG2 from '../rg2Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CourseResultDisplay({ results, display, replay, courseIndex, filter, onSelect,
  onReplay, onFilterChange, onShowResults, isOpen,
  allRoutesDisplayed, allRoutesReplayed, hasRoutes, courseName, onSelectCourse, courseDisplay }) {
  const resultsList = results.map((result) => <ResultItem
    key={result.index.toString()}
    onSelect={onSelect}
    onReplay={onReplay}
    result={result}
    replay={replay[result.index]}
    display={display[result.index]} />)
  const caret = isOpen ? 'caret-down' : 'caret-right'
  return (
    <Card style={{ minWidth: RG2.INFO_BAR_WIDTH + 'px' }}>
      <Card.Header className="clearflex" id={courseIndex.toString()} onClick={onShowResults}>
        <div className="float-left">
          <FontAwesomeIcon icon={caret} /> {courseName}
        </div>
        <div className="float-right">
          <Form.Check
            id={courseIndex.toString()}
            value={courseIndex}
            onChange={onSelectCourse}
            checked={courseDisplay[courseIndex]} />
        </div>
      </Card.Header>
      <Collapse in={isOpen}>
        <Card.Body>
          <SearchBox
            filter={filter}
            onFilterChange={onFilterChange} />
          <div className="py-2">
            <Table striped hover size="sm">
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
            </Table>
          </div>
        </Card.Body>
      </Collapse>
    </Card>
  )
}

export default memo(CourseResultDisplay)
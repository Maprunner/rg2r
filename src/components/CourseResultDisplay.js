import React, { memo } from 'react'
import Card from 'react-bootstrap/lib/Card'
import ResultItem from '../components/ResultItem'
import SearchBox from './SearchBox'
import CourseResultSummaryRow from '../components/CourseResultSummaryRow'
import CourseResultHeaderRow from '../components/CourseResultHeaderRow'

function CourseResultDisplay({ results, display, replay, courseIndex, filter, onSelect, onReplay, onFilterChange,
  allRoutesDisplayed, allRoutesReplayed, hasRoutes }) {
  const resultsList = results.map((result) => <ResultItem
    key={result.index.toString()}
    onSelect={onSelect}
    onReplay={onReplay}
    result={result}
    replay={replay[result.index]}
    display={display[result.index]} />)

  return (
    <Card body>
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
    </Card>
  )
}

export default memo(CourseResultDisplay)
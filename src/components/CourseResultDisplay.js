import React, { memo } from 'react'
import ResultItem from '../components/ResultItem'
import ResultSearch from '../components/ResultSearch'
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
    <>
      <ResultSearch
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
    </>
  )
}

export default memo(CourseResultDisplay)
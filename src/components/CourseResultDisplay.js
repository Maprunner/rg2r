import React from 'react'
import { InputText } from 'primereact/inputtext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ResultItem from '../components/ResultItem'
import CourseResultSummaryRow from '../components/CourseResultSummaryRow'

function CourseResultDisplay({ results, display, courseIndex, filter, onSelect, onReplay, onFilterChange,
  allRoutesDisplayed, allRoutesReplayed, hasRoutes }) {
  const resultsList = results.map((result) => <ResultItem
    key={result.index.toString()}
    onSelect={onSelect}
    onReplay={onReplay}
    result={result}
    display={display} />)
  return (
    <>
      <span>
        <FontAwesomeIcon icon={'search'} fixedWidth />
        <InputText value={filter} onChange={(e) => onFilterChange(e.target.value)} />
      </span>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Time</th>
            <th><FontAwesomeIcon icon={'eye'} /></th>
            <th><FontAwesomeIcon icon={'play'} /></th>
          </tr>
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

export default CourseResultDisplay
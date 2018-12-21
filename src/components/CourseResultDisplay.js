import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import RG2 from '../rg2Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ResultItem from '../components/ResultItem'

function SummaryRow({ onSelect, onReplay, courseIndex, routesChecked, replayChecked, hasRoutes }) {
  let routes
  if (hasRoutes) {
    routes = <Checkbox
      name={courseIndex.toString()}
      value={RG2.DISPLAY_ALL_ROUTES_FOR_COURSE}
      onChange={onSelect}
      checked={routesChecked} />
  } else {
    routes = null
  }
  return (
    <>
      <tr><td></td><td>All</td><td></td><td>{routes}</td><td>
        <Checkbox
          value={RG2.REPLAY_ALL_ROUTES_FOR_COURSE}
          name={courseIndex.toString()}
          onChange={onReplay}
          checked={replayChecked} />
      </td></tr>
    </>
  )
}

function CourseResultDisplay({ results, courseIndex, filter, onSelect, onReplay, onFilterChange, allRoutesDisplayed, allRoutesReplayed, hasRoutes }) {
  const resultsList = results.map((result) => <ResultItem
    key={result.index.toString()}
    onSelect={onSelect}
    onReplay={onReplay}
    result={result} />)
  return (
    <>
      <span>
        <InputText value={filter} onChange={(e) => onFilterChange(e.target.value)} />
        <label htmlFor="in"> Search</label>
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
          <SummaryRow
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
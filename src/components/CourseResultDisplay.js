import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import RG2 from '../rg2Constants';
import ResultItem from '../components/ResultItem'

function SummaryRow({ onSelect, onReplay, courseName, routesChecked, replayChecked, hasRoutes }) {
  let routes;
  if (hasRoutes) {
    routes = <Checkbox
      name={courseName}
      value={RG2.DISPLAY_ALL_ROUTES_FOR_COURSE}
      onChange={onSelect}
      checked={routesChecked} />;
  } else {
    routes = null;
  }
  return (
    <>
      <tr><td></td><td>All</td><td></td><td>{routes}</td><td>
        <Checkbox
          value={RG2.REPLAY_ALL_ROUTES_FOR_COURSE}
          name={courseName}
          onChange={onReplay}
          checked={replayChecked} />
      </td></tr>
    </>
  );
}

function CourseResultDisplay({ results, courseName, filter, onSelect, onReplay, onFilterChange, allRoutesDisplayed, allRoutesReplayed, hasRoutes }) {
  const resultsList = results.map((result) => <ResultItem key={result.index.toString()} onSelect={onSelect} onReplay={onReplay} result={result} />);
  return (
    <>
      <span>
        <InputText value={filter} onChange={(e) => onFilterChange(e.target.value)} />
        <label htmlFor="in"> Search</label>
      </span>
      <table>
        <thead>
          <tr><th></th><th>Name</th><th>Time</th><th></th><th></th></tr>
        </thead>
        <tbody>
          {resultsList}
          <SummaryRow
            courseName={courseName}
            onSelect={onSelect}
            onReplay={onReplay}
            routesChecked={allRoutesDisplayed}
            replayChecked={allRoutesReplayed}
            hasRoutes={hasRoutes} />
        </tbody>
      </table>
    </>
  );
}

export default CourseResultDisplay;
import React, { memo } from 'react'
import { Checkbox } from 'primereact/checkbox'
import RG2 from '../rg2Constants'

function CourseResultSummaryRow({ onSelect, onReplay, courseIndex, routesChecked, replayChecked, hasRoutes }) {
  let routes
  if (hasRoutes) {
    routes = <Checkbox
      name={courseIndex.toString()}
      value={RG2.ALL_ROUTES}
      onChange={onSelect}
      checked={routesChecked} />
  } else {
    routes = null
  }
  return (
    <>
      <tr><td></td><td>All</td><td></td><td>{routes}</td><td>
        <Checkbox
          value={RG2.ALL_ROUTES}
          name={courseIndex.toString()}
          onChange={onReplay}
          checked={replayChecked} />
      </td></tr>
    </>
  )
}

export default memo(CourseResultSummaryRow)
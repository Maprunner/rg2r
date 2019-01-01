import React, { memo } from 'react'
import Form from 'react-bootstrap/lib/Form'
import RG2 from '../rg2Constants'

function CourseResultSummaryRow({ onSelect, onReplay, courseIndex, routesChecked, replayChecked, hasRoutes }) {
  let routes
  if (hasRoutes) {
    routes = <Form.Check
      id={courseIndex.toString()}
      value={RG2.ALL_ROUTES}
      onChange={onSelect}
      checked={routesChecked} />
  } else {
    routes = null
  }
  return (
    <>
      <tr><td></td><td>All</td><td></td><td>{routes}</td><td>
        <Form.Check
          value={RG2.ALL_ROUTES}
          id={courseIndex.toString()}
          onChange={onReplay}
          checked={replayChecked} />
      </td></tr>
    </>
  )
}

export default memo(CourseResultSummaryRow)
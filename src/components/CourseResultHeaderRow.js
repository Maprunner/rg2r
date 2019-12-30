import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CourseResultHeaderRow = () => {
  return (
    <tr>
      <th></th>
      <th>Name</th>
      <th>Time</th>
      <th><FontAwesomeIcon icon={'eye'} /></th>
      <th><FontAwesomeIcon icon={'play'} /></th>
    </tr >
  )
}

export default memo(CourseResultHeaderRow)
import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CourseItemHeader = () => {
  return (
    <tr>
      <th>Course</th>
      <th><FontAwesomeIcon icon={'eye'} /></th>
      <th>Runners</th>
      <th>Routes</th>
      <th><FontAwesomeIcon icon={'eye'} /></th>
      <th><FontAwesomeIcon icon={'play'} /></th>
    </tr>
  )
}
export default memo(CourseItemHeader)
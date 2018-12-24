import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CourseItemHeader = () => {
  return (
    <>
      <th>Course</th>
      <th><FontAwesomeIcon icon={'eye'} /></th>
      <th>Runners</th>
      <th>Routes</th>
      <th><FontAwesomeIcon icon={'eye'} /></th>
      <th><FontAwesomeIcon icon={'play'} /></th>
    </>
  )
}
export default memo(CourseItemHeader)
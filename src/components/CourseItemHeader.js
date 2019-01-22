import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { t } from '../utils/rg2utils.js'

const CourseItemHeader = (props) => {
  return (
    <tr>
      <th>{t(props.dict, "Course")}</th>
      <th><FontAwesomeIcon icon={'eye'} /></th>
      <th>{t(props.dict, "Runners")}</th>
      <th>{t(props.dict, "Routes")}</th>
      <th><FontAwesomeIcon icon={'eye'} /></th>
      <th><FontAwesomeIcon icon={'play'} /></th>
    </tr>
  )
}
export default memo(CourseItemHeader)
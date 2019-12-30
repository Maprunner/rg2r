import React, { memo } from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
import VisibleCourseResultList from '../containers/VisibleCourseResultList'

function ResultDisplay({ courses }) {
  let fullResultList = []
  let courseResults
  for (let i = 0; i < courses.length; i += 1) {
    courseResults = <VisibleCourseResultList key={i} courseIndex={i} />
    fullResultList.push(courseResults)
  }
  return (
    <CardGroup style={{ width: '100%' }}>
      {fullResultList}
    </CardGroup >
  )
}

export default memo(ResultDisplay)
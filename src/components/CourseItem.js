import React, { memo } from 'react'
import Form from 'react-bootstrap/lib/Form'
import RG2 from '../rg2Constants'

const CourseItem = (props) => {
  const { name, checked, resultCount, routeCount, onSelectCourse,
    allRoutesDisplayed, allRoutesReplayed, onDisplayAllRoutes, onReplayAllRoutes, index } = props
  return (
    <tr>
      <td>{name}</td>
      <td><Form.Check
        id={index}
        value={index}
        onChange={onSelectCourse}
        checked={checked} />
      </td>
      <td className="center-text">{resultCount}</td>
      <td className="center-text">{routeCount}</td>
      <td>{routeCount > 0 ?
        <Form.Check
          id={RG2.ALL_ROUTES}
          value={index.toString()}
          onChange={onDisplayAllRoutes}
          checked={allRoutesDisplayed}
        /> : null}</td>
      <td>{routeCount > 0 ?
        <Form.Check
          id={index}
          value={index}
          onChange={onReplayAllRoutes}
          checked={allRoutesReplayed}
        /> : null}</td>
    </tr>
  )
}
export default memo(CourseItem)
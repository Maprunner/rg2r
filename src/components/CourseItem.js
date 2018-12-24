import React, { memo } from 'react'
import { Checkbox } from 'primereact/checkbox'
import RG2 from '../rg2Constants'

const CourseItem = (props) => {
  const { name, checked, resultCount, routeCount, onSelectCourse,
    allRoutesDisplayed, allRoutesReplayed, onDisplayAllRoutes, onReplayAllRoutes, index } = props
  return (
    <tr>
      <td>{name}</td>
      <td><Checkbox value={index} onChange={onSelectCourse} checked={checked}></Checkbox></td>
      <td className="center-text">{resultCount}</td>
      <td className="center-text">{routeCount}</td>
      <td>{routeCount > 0 ?
        <Checkbox
          value={RG2.ALL_ROUTES}
          name={index.toString()}
          onChange={onDisplayAllRoutes}
          checked={allRoutesDisplayed}>
        </Checkbox> : null}</td>
      <td>{routeCount > 0 ?
        <Checkbox
          value={index}
          onChange={onReplayAllRoutes}
          checked={allRoutesReplayed}>
        </Checkbox> : null}</td>
    </tr>
  )
}
export default memo(CourseItem)
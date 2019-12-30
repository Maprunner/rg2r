import React, { memo } from 'react'
import SingleRoute from './SingleRoute.js'
import { mergeXYArray } from '../utils/rg2utils.js'

function AllRoutes(props) {
  const { routes, opt } = props

  if (routes.length === 0) {
    return null
  }
  const allRoutes = []
  let xy
  // routes already filtered so we just display everything we get
  for (let i = 0; i < routes.length; i += 1) {
    xy = mergeXYArray(routes[i].x, routes[i].y)
    allRoutes.push(<SingleRoute key={i} points={xy} colour={routes[i].colour} width={opt.courseWidth} intensity={opt.routeIntensity} />)
  }
  return (
    <>
      {allRoutes}
    </>
  )
}

export default memo(AllRoutes)

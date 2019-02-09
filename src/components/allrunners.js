import React, { memo } from 'react'
import SingleRunner from './SingleRunner.js'
import { mergeXYArray } from '../utils/rg2utils.js'

function getPoints(runner, animation) {
  // TODO move to selector?
  let xy
  let timeOffset
  if (animation.realTime) {
    timeOffset = runner.starttime
  } else {
    //if ((this.massStartControl === 0) || (runner.splits.length < this.massStartControl)) {
    // no offset since we are starting from the start
    timeOffset = 0
    //} else {
    //  // offset needs to move forward (hence negative) to time at control
    //  timeOffset = -1 * result.splits[this.massStartControl]
    //}
  }
  // TODO: complicated stop at control logic missing
  xy = mergeXYArray(
    runner.x.slice(animation.tailStartTimeSecs - timeOffset, animation.time - timeOffset),
    runner.y.slice(animation.tailStartTimeSecs - timeOffset, animation.time - timeOffset)
  )
  return xy
}

function AllRunners(props) {
  const { runners, animation } = props

  if (runners.length === 0) {
    return null
  }
  const allRunners = []
  let xy
  for (let i = 0; i < runners.length; i += 1) {
    xy = getPoints(runners[i], animation)
    allRunners.push(<SingleRunner key={i} points={xy} colour={runners[i].colour} />)
  }
  return (
    <>
      {allRunners}
    </>
  )
}

export default memo(AllRunners)

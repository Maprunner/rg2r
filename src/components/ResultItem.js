import React from 'react'
import { Checkbox } from 'primereact/checkbox'

function ResultItem({ result, onSelect, onReplay }) {
  let displayRoute
  if (result.x.length > 0) {
    displayRoute = <Checkbox name={result.courseIndex.toString()} value={result.index} onChange={onSelect} checked={result.displayRoute} />
  } else {
    displayRoute = <></>
  }
  return (
    <>
      <tr>
        <td>{result.position}</td>
        <td>{result.name}</td>
        <td>{result.time}</td>
        <td>{displayRoute}</td>
        <td><Checkbox value={result.index} name={result.courseIndex.toString()} onChange={onReplay} checked={result.replay} /></td>
      </tr>
    </>
  )
}

export default ResultItem
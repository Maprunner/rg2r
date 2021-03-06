//import React from 'react'
import React, { memo } from 'react'
import Form from 'react-bootstrap/Form'

function ResultItem(props) {
  const { result, display, replay, onSelect, onReplay } = props
  let displayRoute
  if (result.x.length > 0) {
    displayRoute = <Form.Check
      value={result.courseIndex.toString()}
      // toString avoids problems with id=0 being ignored
      id={result.index.toString()}
      onChange={onSelect}
      checked={display} />
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
        <td><Form.Check
          value={result.index}
          id={result.courseIndex.toString()}
          onChange={onReplay}
          checked={replay} /></td>
      </tr>
    </>
  )
}

export default memo(ResultItem)

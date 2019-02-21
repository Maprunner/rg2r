import React, { memo } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function GenericDropdown(props) {
  // values is an array of {"text": text-for-dropdown, "key": value-to-pass}
  const { id, values, active, onSelect } = props
  const dropdown = []
  let title
  for (let i = 0; i < values.length; i += 1) {
    if (values[i].key === active) {
      dropdown.push(< Dropdown.Item key={i} eventKey={values[i].key} active onSelect={onSelect}>{values[i].text}</Dropdown.Item >)
      title = values[i].text
    } else {
      dropdown.push(< Dropdown.Item key={i} eventKey={values[i].key} onSelect={onSelect}>{values[i].text}</Dropdown.Item >)
    }
  }
  return (
    <>
      <DropdownButton id={"dropdown" + id} variant="info" title={title}>
        {dropdown}
      </DropdownButton>
    </>
  )
}
export default memo(GenericDropdown)


import React, { memo } from 'react'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import Dropdown from 'react-bootstrap/lib/Dropdown'

function ReplaySpeed(props) {
  const { timerIncrement, onSetSpeed } = props
  const speedOptions = [
    { label: 'x1', value: 100 },
    { label: 'x2', value: 200 },
    { label: 'x5', value: 500 },
    { label: 'x10', value: 1000 },
    { label: 'x15', value: 1500 },
    { label: 'x30', value: 3000 },
    { label: 'x60', value: 6000 },
    { label: 'x120', value: 12000 },
    { label: 'x250', value: 25000 },
    { label: 'x500', value: 50000 },
    { label: 'x1000', value: 100000 }
  ].map(option => (
    <Dropdown.Item key={option.value} eventKey={option.value}>{option.label}</Dropdown.Item>
  ))
  return (
<DropdownButton 
  id="speed-dropdown"
  onSelect={onSetSpeed}
  title={"x" + (timerIncrement / 100)}
  variant="Primary"
  key={timerIncrement} >
  {speedOptions}
</DropdownButton>
  )
}

export default memo(ReplaySpeed)

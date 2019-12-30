import React, { memo } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

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
    { label: 'x240', value: 24000 }
  ]
  let speeds = []
  for (let i = 0; i < speedOptions.length; i += 1) {
    if (speedOptions.value === timerIncrement) {
      speeds.push(< Dropdown.Item key={i} eventKey={speedOptions[i].value} active onSelect={onSetSpeed}> {speedOptions[i].label}</Dropdown.Item >)
    } else {
      speeds.push(< Dropdown.Item key={i} eventKey={speedOptions[i].value} onSelect={onSetSpeed}> {speedOptions[i].label}</Dropdown.Item >)
    }
  }
  return (
    <div>
      <DropdownButton
        drop="up"
        id="dropdownSpeed"
        title={"x" + (timerIncrement / 100)}
        variant="info"
      >
        {speeds}
      </DropdownButton>
    </div>
  )
}

export default memo(ReplaySpeed)

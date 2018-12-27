import React, { memo } from 'react'
import { Dropdown } from 'primereact/dropdown'

function ReplaySpeed(props) {
  const { timerIncrement, onSetSpeed } = props
  const speedOptions = [
    { label: 'x1', value: 100 },
    { label: 'x2', value: 200 },
    { label: 'x5', value: 500 },
    { label: 'x10', value: 10000 },
    { label: 'x15', value: 15000 },
    { label: 'x30', value: 30000 },
    { label: 'x60', value: 60000 },
    { label: 'x120', value: 120000 },
    { label: 'x250', value: 250000 },
    { label: 'x500', value: 500000 },
    { label: 'x1000', value: 1000000 }
  ]
  return (
    <Dropdown value={timerIncrement} options={speedOptions} onChange={onSetSpeed} />
  )
}

export default memo(ReplaySpeed)

import React, { memo } from 'react'
import { InputText } from 'primereact/inputtext'
import EventList from '../components/EventList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function EventDisplay(props) {
  const { filter, onFilterChange, onSelectEvent, events, } = props
  return (
    <div>
      <span>
        <FontAwesomeIcon icon={'search'} fixedWidth />
        <InputText value={filter} onChange={(e) => onFilterChange(e.target.value)} />
      </span>
      <div>
        <EventList events={events} onClick={onSelectEvent} ></EventList>
      </div>
    </div>
  )
}

export default memo(EventDisplay)
import React, { memo } from 'react'
import { InputText } from 'primereact/inputtext'
import EventList from '../components/EventList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/lib/Card'

function EventDisplay(props) {
  const { filter, onFilterChange, onSelectEvent, events, } = props
  return (
    <Card body>
      <span>
        <FontAwesomeIcon icon={'search'} fixedWidth />
        <InputText value={filter} onChange={(e) => onFilterChange(e.target.value)} />
      </span>
      <div>
        <EventList events={events} onClick={onSelectEvent} ></EventList>
      </div>
    </Card>
  )
}

export default memo(EventDisplay)
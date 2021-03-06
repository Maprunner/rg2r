import React, { memo, useEffect } from 'react'
import EventList from '../components/EventList'
import SearchBox from './SearchBox'
import Card from 'react-bootstrap/Card'

function EventDisplay(props) {
  const { filter, onFilterChange, onSelectEvent, pendingEvent, events } = props

  useEffect(() => {
    if (pendingEvent) {
      onSelectEvent(events[pendingEvent])
    }
  })

  return (
    <Card body>
      <SearchBox
        filter={filter}
        onFilterChange={onFilterChange} />
      <div className="py-2">
        <EventList events={events} onClick={onSelectEvent} ></EventList>
      </div>
    </Card>
  )
}

export default memo(EventDisplay)
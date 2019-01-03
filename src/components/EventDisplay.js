import React, { memo } from 'react'
import EventList from '../components/EventList'
import SearchBox from './SearchBox'
import Card from 'react-bootstrap/lib/Card'

function EventDisplay(props) {
  const { filter, onFilterChange, onSelectEvent, events, } = props
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
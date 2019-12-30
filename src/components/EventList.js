import React, { memo } from 'react'
import Table from 'react-bootstrap/Table'
import EventItem from '../components/EventItem'

function EventList({ events, onClick }) {
  const eventItems = events.map((event, i) =>
    <EventItem key={i} event={event} onSelect={onClick} />
  )
  return (
    <div id="rg2-event-list">
      <Table striped hover size="sm">
        <tbody>
          {eventItems}
        </tbody>
      </Table>
    </div>
  )
}

export default memo(EventList)
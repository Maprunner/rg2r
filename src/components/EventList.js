import React, { memo } from 'react'
import EventItem from '../components/EventItem'

function EventList({ events, onClick }) {
  const eventItems = events.map((event, i) =>
    <EventItem key={i} event={event} onSelect={onClick} />
  )
  return (
    <div id="rg2-event-list">
      <ul>
        {eventItems}
      </ul>
    </div>
  )
}

export default memo(EventList)
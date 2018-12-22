import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function EventItem(props) {
  return <li onClick={() => props.onClick(props.event)} title={props.event.type + (props.event.comment !== "" ? ": " + props.event.comment : "")}>
    {props.event.worldfile.valid ? <FontAwesomeIcon icon={'globe-americas'} fixedWidth /> : null}
    {props.event.comment !== "" ? <FontAwesomeIcon icon={'info-circle'} fixedWidth /> : null}
    {props.event.date}: {props.event.name}</li>
}

function EventList({ events, onClick }) {
  const eventItems = events.map((event, i) =>
    <EventItem key={i} event={event} onClick={onClick} />
  )
  return (
    <div id="rg2-event-list">
      <ul>
        {eventItems}
      </ul>
    </div>
  )
}

export default EventList
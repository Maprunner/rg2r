import React from 'react';

function EventItem(props) {
  return <li onClick={() => props.onClick(props.event)}>{props.event.date} {props.event.name}</li>;
}

function EventList({ events, onClick }) {
  const eventItems = events.map((event, i) =>
    <EventItem key={i} event={event} onClick={onClick} />
  );
  return (
    <ul>
      {eventItems}
    </ul>
  );
}

export default EventList;
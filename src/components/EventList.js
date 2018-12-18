import React from 'react';

function EventItem(props) {
  return <tr onClick={() => props.onClick(props.event)}><td>{props.event.date}: {props.event.name}</td></tr>
}

function EventList({ events, onClick }) {
  const eventItems = events.map((event, i) =>
    <EventItem key={i} event={event} onClick={onClick} />
  );
  return (
    <table>
      <tbody>
        {eventItems}
      </tbody>
    </table>
  );
}

export default EventList;
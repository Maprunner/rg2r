import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';

function EventItem(props) {
  return <li onClick={(e) => props.onClick(props.event.id)}>{props.event.id} {props.event.date} {props.event.name}</li>;
}

function EventList({ events, onClick }) {
  const eventItems = events.map((event) =>
    <EventItem key={event.id} event={event} onClick={onClick} />
  );
  return (
    <ul>
      {eventItems}
    </ul>
  );
}


class Events extends Component {

  render() {
    return (
      <div>
        <span>
          <InputText />
          <label htmlFor="in">Search</label>
        </span>
        <div className="rg2-ul">
          <EventList events={this.props.events} onClick={this.props.setEvent} ></EventList>
        </div>
      </div>
    );
  }
}

export default Events;
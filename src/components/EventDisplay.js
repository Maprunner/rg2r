import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import EventList from '../components/EventList'

class EventDisplay extends Component {

  render() {
    return (
      <div>
        <span>
          <InputText value={this.props.filter} onChange={(e) => this.props.onFilterChange(e.target.value)} />
          <label htmlFor="in"> Search</label>
        </span>
        <div className="rg2-ul">
          <EventList events={this.props.events} onClick={this.props.onSelectEvent} ></EventList>
        </div>
      </div>
    );
  }
}

export default EventDisplay;
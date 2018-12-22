import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext'
import EventList from '../components/EventList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EventDisplay extends Component {

  render() {
    return (
      <div>
        <span>
          <FontAwesomeIcon icon={'search'} fixedWidth />
          <InputText value={this.props.filter} onChange={(e) => this.props.onFilterChange(e.target.value)} />
        </span>
        <div>
          <EventList events={this.props.events} onClick={this.props.onSelectEvent} ></EventList>
        </div>
      </div>
    )
  }
}

export default EventDisplay
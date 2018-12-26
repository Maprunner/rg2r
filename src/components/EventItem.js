import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EventItem extends React.PureComponent {
  comment = <FontAwesomeIcon icon={'info-circle'} fixedWidth />
  worldfile = <FontAwesomeIcon icon={'globe-americas'} fixedWidth />
  onClick = () => this.props.onSelect(this.props.event)
  render() {
    const { event } = this.props
    return (
      <li onClick={this.onClick} title={event.type + (event.comment !== "" ? ": " + event.comment : "")}>
        {event.worldfile.valid ? this.worldfile : null}
        {event.comment !== "" ? this.comment : null}
        {event.date}: {event.name}
      </li>
    )
  }
}

export default EventItem
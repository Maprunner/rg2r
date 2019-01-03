import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EventItem extends React.PureComponent {
  comment = <FontAwesomeIcon icon={'info-circle'} fixedWidth />
  worldfile = <FontAwesomeIcon icon={'globe-americas'} fixedWidth />
  onClick = () => this.props.onSelect(this.props.event)
  render() {
    const { event } = this.props
    return (
      <tr onClick={this.onClick} title={event.type + (event.comment !== "" ? ": " + event.comment : "")}>
        <td>{event.worldfile.valid ? this.worldfile : null}{event.comment !== "" ? this.comment : null}</td>
        <td>{event.date}: {event.name}</td>
      </tr>
    )
  }
}

export default EventItem
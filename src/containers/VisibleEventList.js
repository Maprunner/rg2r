import { connect } from 'react-redux'
import EventDisplay from '../components/EventDisplay'
import { loadEvent, filterEvents } from '../actions/actions.js'

function getVisibleEvents(events, filter) {
  let e = events.filter(function (event) {
    return event.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  })
  return e
}

const mapStateToProps = state => ({
  events: getVisibleEvents(state.events.data, state.events.filter),
  filter: state.events.filter
})

const mapDispatchToProps = dispatch => ({
  onSelectEvent: (event) => dispatch(loadEvent(event)),
  onFilterChange: filter => dispatch(filterEvents(filter)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDisplay)
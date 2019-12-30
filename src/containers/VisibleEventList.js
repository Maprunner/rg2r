import { connect } from 'react-redux'
import EventDisplay from '../components/EventDisplay'
import { loadEvent, filterEvents } from '../actions/actions.js'
import { getVisibleEvents } from '../selectors/selectors.js'

const mapStateToProps = state => ({
  events: getVisibleEvents(state),
  filter: state.events.filter,
  pendingEvent: state.events.pendingEvent
})

const mapDispatchToProps = dispatch => ({
  onSelectEvent: (event) => dispatch(loadEvent(event)),
  onFilterChange: filter => dispatch(filterEvents(filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDisplay)
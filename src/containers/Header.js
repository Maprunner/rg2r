import { connect } from 'react-redux'
import TopPanel from '../components/TopPanel'

const mapStateToProps = state => ({
  title: state.events.title
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopPanel)
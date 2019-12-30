import { connect } from 'react-redux'
import DrawDialog from '../components/DrawDialog'
import { setCourseToDraw } from '../actions/drawActions.js'
import { getDictionary, getCoursesForDraw } from '../selectors/selectors'

const mapStateToProps = state => ({
  dict: getDictionary(state),
  course: state.draw.course,
  courses: getCoursesForDraw(state)
})

const mapDispatchToProps = dispatch => ({
  onSelectCourse: (event) => dispatch(setCourseToDraw(event))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawDialog)
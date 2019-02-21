import update from 'immutability-helper'
//import RG2 from '../rg2Constants'

const initialState = {
  course: null,
}

const draw = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COURSE_TO_DRAW':
      return update(state, {
        course: { $set: action.course }
      })
    default:
      return state
  }
}

export default draw
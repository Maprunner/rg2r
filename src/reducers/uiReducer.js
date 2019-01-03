import update from 'immutability-helper'
import RG2 from '../rg2Constants'

const initialState = {
  activeTabIndex: RG2.TAB_EVENTS,
  drawEnabled: false
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'TAB_CHANGED':
      return update(state, {
        activeTabIndex: { $set: action.index }
      })
    case 'SAVE_EVENT':
      return update(state, {
        activeTabIndex: { $set: RG2.TAB_COURSES }
      })
    case 'EVENT_REQUESTED':
      return initialState
    default:
      return state
  }
}

export default ui
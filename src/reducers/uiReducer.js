import update from 'immutability-helper'
import RG2 from '../rg2Constants'

const initialState = {
  infoOpen: true,
  configOpen: false,
  activeTabIndex: RG2.TAB_EVENTS,
  drawEnabled: false,
  hash: "",
  t: []
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'EVENT_REQUESTED':
      return initialState
    case 'SAVE_EVENT':
      const hash = '#' + action.id
      return update(state, {
        activeTabIndex: { $set: RG2.TAB_COURSES },
        hash: { $set: hash }
      })
    case 'TAB_CHANGED':
      return update(state, {
        activeTabIndex: { $set: action.index }
      })
    case 'TOGGLE_CONFIG':
      return update(state, {
        configOpen: { $set: !state.configOpen }
      })
    case 'TOGGLE_INFO':
      return update(state, {
        infoOpen: { $set: !state.infoOpen }
      })
    default:
      return state
  }
}

export default ui
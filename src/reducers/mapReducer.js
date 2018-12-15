import update from 'immutability-helper';

const initialState = {
  mapImage: null,
  width: window.innerWidth,
  height: window.innerHeight - 36,
  zoom: { x: 1, y: 1 },
  x: 360,
  y: 0
}

const map = (state = initialState, action) => {
  switch (action.type) {
    case 'MAP_LOADED':
      return update(state, {
        mapImage: { $set: action.image }
      });
    default:
      return state
  }
}

export default map;
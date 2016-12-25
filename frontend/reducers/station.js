import { combineReducers } from 'redux';
import { List } from 'immutable';

import StationActions from '../actions/station';

function stations(state = new List(), action) {
  switch (action.type) {
    case StationActions.SET_STATIONS:
      return action.stations;
    default:
      return state;
  }
}

export default combineReducers({
  stations,
})

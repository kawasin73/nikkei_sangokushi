import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import stations from './station';

export default combineReducers({
  stations,
  routing: routerReducer,
});

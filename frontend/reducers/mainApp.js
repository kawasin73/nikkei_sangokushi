import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import station from './station';

export default combineReducers({
  station,
  routing: routerReducer,
});

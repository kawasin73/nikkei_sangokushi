import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import station from './station';
import main from './main';

export default combineReducers({
  main,
  station,
  routing: routerReducer,
});

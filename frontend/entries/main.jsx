import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'babel-polyfill'

import MetoroContainer from '../containers/MetoroContainer';
import MainContainer from '../containers/MainContainer';
import StationContainer from '../containers/StationContainer';
import MyPageContainer from '../containers/MyPageContainer';
import MyStationsContainer from '../containers/MyStationsContainer';
import ReportNewContainer from '../containers/ReportNewContainer';
import ReportEditContainer from '../containers/ReportEditContainer';

import configureStore from '../stores/configureMainStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MetoroContainer}>
        <IndexRoute component={MainContainer}/>
        <Route path="/stations/:stationId" component={StationContainer}/>
        <Route path="/mypage" component={MyPageContainer}>
          <IndexRoute component={MyStationsContainer}/>
          <Route path="/stations/:stationId/reports/new" component={ReportNewContainer}/>
          <Route path="/stations/:stationId/reports/edit" component={ReportEditContainer}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);

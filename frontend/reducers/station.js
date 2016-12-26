import { combineReducers } from 'redux';
import { List } from 'immutable';

import StationActions from '../actions/station';

function stations(state = new List(), action) {
  switch (action.type) {
    case StationActions.SET_STATIONS: {
      return action.stations;
    }
    case StationActions.REFRESH_CHECK_IN: {
      const ids = action.checkIns.map((checkIn) => checkIn.stationId);
      return state.map((station) => {
        return station.set('haveCheckedIn', ids.includes(station.id));
      });
    }
    case StationActions.REFRESH_FOUND_REPORT: {
      const ids = action.reports.map((report) => report.station.id);
      return state.map((station) => {
        return station.set('haveFound', ids.includes(station.id));
      });
    }
    case StationActions.ADD_FOUND_REPORT: {
      console.log("action.report", action.report);
      return state.map((station) => {
        if (station.id !== action.report.station.id) {
          return station;
        } else {
          return station.set('haveFound', true).set('haveCheckedIn', true);
        }
      })
    }
    case StationActions.REPLACE_STATION: {
      return state.map((station) => {
        if (station.id === action.station.id) {
          return action.station;
        } else {
          return station;
        }
      });
    }
    default: {
      return state;
    }
  }
}

function checkIns(state = new List(), action) {
  switch (action.type) {
    case StationActions.REFRESH_CHECK_IN: {
      return action.checkIns;
    }
    default: {
      return state;
    }
  }
}

function foundReports(state = new List(), action) {
  switch (action.type) {
    case StationActions.REFRESH_FOUND_REPORT: {
      return action.reports;
    }
    case StationActions.ADD_FOUND_REPORT: {
      return state.push(action.report);
    }
    default: {
      return state;
    }
  }
}

function isInitialized(state = false, action) {
  switch (action.type) {
    case StationActions.INITIALIZED: {
      return true;
    }
    default: {
      return state;
    }
  }
}

function isSubmittingReport(state = false, action) {
  switch (action.type) {
    case StationActions.SET_SUBMITTING: {
      return action.value;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  stations,
  checkIns,
  foundReports,
  isInitialized,
  isSubmittingReport,
})

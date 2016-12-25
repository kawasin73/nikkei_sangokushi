const Actions = {
  SET_STATIONS: 'station/set_stations',
  REFRESH_CHECK_IN: 'station/refresh_check_in',
};

import { getStations, getCheckIns } from '../api/request';

export default Actions

export function loadStations() {
  return async(dispatch) => {
    console.log("loadStations");
    const stations = await getStations();
    dispatch(setStations(stations));
  };
}

export function refreshCheckIns() {
  return async(dispatch) => {
    console.log("refreshCheckIns");
    const checkIns = await getCheckIns();
    dispatch(refreshCheckIn(checkIns))
  };
}

function refreshCheckIn(checkIns) {
  return {
    type: Actions.REFRESH_CHECK_IN,
    checkIns,
  }
}

function setStations(stations) {
  return {
    type: Actions.SET_STATIONS,
    stations: stations,
  };
}

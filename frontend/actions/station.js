const Actions = {
  SET_STATIONS: 'station/set_stations',
  REFRESH_CHECK_IN: 'station/refresh_check_in',
  REPLACE_STATION: 'station/replace_station',
  INITIALIZED: 'station/initialized',
  SET_SUBMITTING: 'station/set_submitting',
};

import {
  getStations,
  getCheckIns,
  checkInStation,
  checkOutStation,
  postFoundReport
} from '../api/request';

export default Actions

export function loadStations() {
  return async(dispatch) => {
    console.log("loadStations");
    const stations = await getStations();
    dispatch(setStations(stations));
    dispatch(initialized());
  };
}

function initialized() {
  return {
    type: Actions.INITIALIZED,
  }
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

export function createCheckIn(station) {
  return async(dispatch) => {
    const checkedInStation = station.set('haveCheckedIn', true);
    dispatch(replaceStation(checkedInStation));
    try {
      await checkInStation(station);
    } catch (error) {
      dispatch(replaceStation(station));
    }
  }
}

export function deleteCheckIn(station) {
  return async(dispatch) => {
    const checkedOutStation = station.set('haveCheckedIn', false);
    dispatch(replaceStation(checkedOutStation));
    try {
      await checkOutStation(station);
    } catch (error) {
      dispatch(replaceStation(station));
    }
  }
}

function replaceStation(station) {
  return {
    type: Actions.REPLACE_STATION,
    station,
  };
}

export function createFoundReport(stationId, comment, image) {
  return async(dispatch) => {
    dispatch(setSubmitting(true));
    try {
      const res = postFoundReport(stationId, comment, image);
    } catch (error) {
      console.log(error);
    }
    dispatch(setSubmitting(false));
  }
}

function setSubmitting(value) {
  return {
    type: Actions.SET_SUBMITTING,
    value,
  }
}

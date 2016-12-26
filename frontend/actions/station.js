const Actions = {
  SET_STATIONS: 'station/set_stations',
  REFRESH_CHECK_IN: 'station/refresh_check_in',
  REFRESH_FOUND_REPORT: 'station/refresh_found_report',
  REPLACE_STATION: 'station/replace_station',
  REPLACE_FOUND_REPORT: 'station/replace_found_report',
  INITIALIZED: 'station/initialized',
  SET_SUBMITTING: 'station/set_submitting',
  ADD_FOUND_REPORT: 'station/add_found_report',
};

import * as request from '../api/request';

export default Actions

export function loadStations() {
  return async(dispatch) => {
    console.log("loadStations");
    const stations = await request.getStations();
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
    const checkIns = await request.getCheckIns();
    dispatch(refreshCheckIn(checkIns))
  };
}

export function refreshFoundReports() {
  return async(dispatch) => {
    const reports = await request.getCurrentFoundReports();
    dispatch(refreshFoundReport(reports));
  }
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

function refreshFoundReport(reports) {
  return {
    type: Actions.REFRESH_FOUND_REPORT,
    reports,
  };
}

export function createCheckIn(station) {
  return async(dispatch) => {
    const checkedInStation = station.set('haveCheckedIn', true);
    dispatch(replaceStation(checkedInStation));
    try {
      await request.checkInStation(station);
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
      await request.checkOutStation(station);
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
      const report = await request.postFoundReport(stationId, comment, image);
      dispatch(addFoundReport(report));
    } catch (error) {
      console.log(error);
    }
    dispatch(setSubmitting(false));
  }
}

function addFoundReport(report) {
  return {
    type: Actions.ADD_FOUND_REPORT,
    report,
  };
}

function setSubmitting(value) {
  return {
    type: Actions.SET_SUBMITTING,
    value,
  }
}

export function updateFoundReport(reportId, comment, image) {
  return async(dispatch) => {
    dispatch(setSubmitting(true));
    try {
      const report = await request.updateFoundReport(reportId, comment, image);
      dispatch(replaceFoundReport(report));
    } catch (error) {
      console.log(error);
    }
    dispatch(setSubmitting(false));
  }
}

function replaceFoundReport(report) {
  return {
    type: Actions.REPLACE_FOUND_REPORT,
    report,
  }
}

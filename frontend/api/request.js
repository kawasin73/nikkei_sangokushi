import { List } from 'immutable';

import {
  requestGetStations,
  requestSignUp,
  requestLogin,
  requestGetCheckIns,
  requestPostCheckIn,
  requestDeleteCheckIn,
  requestPostFoundReport,
  requestUpdateFoundReport,
  requestDeleteFoundReport,
  requestGetCurrentFoundReports,
} from './client';

import auth from './auth';

import Station from '../records/station';
import CheckIn from '../records/checkIn';
import User from '../records/user';
import FoundReport from '../records/foundReport';

export async function signUp(nickName, password) {
  const response = await requestSignUp(nickName, password);
  const data = response.data.data;
  const accessToken = data.access_token.token;
  const refreshToken = data.access_token.refresh_token;
  const user = User.fromJS(data.user);
  auth.saveToken(accessToken, refreshToken);
  auth.saveCurrentUser(user);
  return user;
}

export async function signIn(nickName, password) {
  const response = await requestLogin(nickName, password);
  const data = response.data.data;
  const accessToken = data.access_token.token;
  const refreshToken = data.access_token.refresh_token;
  const user = User.fromJS(data.user);
  auth.saveToken(accessToken, refreshToken);
  auth.saveCurrentUser(user);
  return user;
}

export async function signOut() {
  auth.signOut()
  return null
}

export async function getStations() {
  const response = await requestGetStations();
  const stations = response.data.data.stations.map((station) => Station.fromJS(station));
  return new List(stations);
}

export async function getCheckIns() {
  const response = await requestGetCheckIns();
  const checkIns = response.data.data.check_ins.map((check_in) => CheckIn.fromJS(check_in));
  return new List(checkIns);
}

export async function checkInStation(station) {
  const response = await requestPostCheckIn(station.id);
  return true;
}

export async function checkOutStation(station) {
  const response = await requestDeleteCheckIn(station.id);
  return true;
}

export async function postFoundReport(stationId, comment, image) {
  const response = await requestPostFoundReport(stationId, comment, image);
  const foundReport = FoundReport.fromJS(response.data.data.report);
  return foundReport;
}

export async function updateFoundReport(reportId, comment, image) {
  const response = await requestUpdateFoundReport(reportId, comment, image);
  const foundReport = FoundReport.fromJS(response.data.data.report);
  return foundReport;
}

export async function deleteFoundReport(reportId) {
  const response = await requestDeleteFoundReport(reportId);
  return true
}

export async function getCurrentFoundReports() {
  const response = await requestGetCurrentFoundReports();
  const reports = response.data.data.found_reports.map((report) => FoundReport.fromJS(report));
  return reports;
}

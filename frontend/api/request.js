import { List } from 'immutable';

import {
  requestGetStations,
  requestSignUp,
  requestLogin,
} from './client';

import auth from './auth';

import Station from '../records/station';

export async function getStations() {
  const response = await requestGetStations();
  const stations = response.data.data.stations.map((station) => Station.fromJS(station));
  return new List(stations);
}

export async function signUp(nickName, password) {
  const response = await requestSignUp(nickName, password);
  const data = response.data.data;
  const accessToken = data.accessToken.token;
  const refreshToken = data.accessToken.refresh_token;
  auth.saveToken(accessToken, refreshToken);
  return true
}

export async function signIn(nickName, password) {
  const response = await requestLogin(nickName, password);
  const data = response.data.data;
  const accessToken = data.accessToken.token;
  const refreshToken = data.accessToken.refresh_token;
  auth.saveToken(accessToken, refreshToken);
  return true
}

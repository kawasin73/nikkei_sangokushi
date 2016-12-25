import { List } from 'immutable';

import {
  requestGetStations,
  requestSignUp,
  requestLogin,
} from './client';

import auth from './auth';

import Station from '../records/station';
import User from '../records/user';

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
  const user = User.fromJS(data.user);
  auth.saveToken(accessToken, refreshToken);
  auth.saveNickName(user.nickName);
  return user;
}

export async function signIn(nickName, password) {
  const response = await requestLogin(nickName, password);
  const data = response.data.data;
  const accessToken = data.accessToken.token;
  const refreshToken = data.accessToken.refresh_token;
  const user = User.fromJS(data.user);
  auth.saveToken(accessToken, refreshToken);
  auth.saveNickName(user.nickName);
  return user;
}

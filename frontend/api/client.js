import axios from 'axios';
import auth from './auth';

if (process.env.NODE_ENV === 'production') {
  const BASE_URL = "/api/v1"
} else {
  const BASE_URL = "http://localhost:3000/api/v1"
}

const client = axios.create({
  baseURL: '/api/v1',
  timeout: 60000,
});

export function createAuthClient(accessToken) {
  return axios.create({
    baseURL: '/api/v1',
    timeout: 60000,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

export function requestRefreshToken(refreshToken) {
  return client.put('/token/refresh', {
    refresh_token: refreshToken,
  });
}

export function requestLogin(nickName, password) {
  return client.post('/token', {
    nick_name: nickName,
    password: password,
  });
}

export function requestSignUp(nickName, password) {
  return client.post('/users', {
    nick_name: nickName,
    password: password,
    password_confirmation: password,
  });
}

export function requestGetStations() {
  return client.get('/stations', {});
}

export function requestGetCheckIns() {
  return auth.client.get('/check_ins', {});
}

export function requestPostCheckIn(stationId) {
  return auth.client.post('/check_ins', {
    station_id: stationId,
  });
}

export function requestDeleteCheckIn(stationId) {
  return auth.client.delete(`/stations/${stationId}/check_ins`, {
    station_id: stationId,
  });
}

export function requestPostFoundReport(stationId, comment, image) {
  let data = new FormData();
  data.append('station_id', stationId);
  data.append('comment', comment);
  if (image) {
    data.append('image', image);
  }
  return auth.client.post('/found_reports', data);
}

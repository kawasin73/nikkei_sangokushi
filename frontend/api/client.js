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

export function requestUpdateFoundReport(reportId, comment, image) {
  let data = new FormData();
  data.append('comment', comment);
  if (image) {
    data.append('image', image);
  }
  return auth.client.put(`/found_reports/${reportId}`, data);
}

export function requestDeleteFoundReport(reportId) {
  return auth.client.delete(`/found_reports/${reportId}`);
}

export function requestGetCurrentFoundReports() {
  return auth.client.get(`/users/${auth.user.id}/found_reports`, {});
}

export function requestGetStationReports(stationId) {
  return auth.client.get(`/stations/${stationId}/found_reports`, {});
}

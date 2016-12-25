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

export function requestGetStations() {
  return client.get('/stations', {});
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

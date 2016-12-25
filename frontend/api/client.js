import axios from 'axios';



if (process.env.NODE_ENV === 'production') {
  const BASE_URL = "/api/v1"
} else {
  const BASE_URL = "http://localhost:3000/api/v1"
}

const client = axios.create({
  baseURL: '/api/v1',
  timeout: 60000,
});

export function requestGetStations() {
  const base = '/stations';
  return client.get(base, {});
}

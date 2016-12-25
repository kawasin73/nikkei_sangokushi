import { List } from 'immutable';

import {
  requestGetStations,
} from './client';

import Station from '../records/station';

export async function getStations() {
  let response = await requestGetStations();
  let stations = response['data']['stations'].map((station) => Station.fromJS(station));
  return new List(stations);
}

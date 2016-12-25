import { Record } from 'immutable';
import Line from './line';

const _CheckIn = Record({
  id: null,
  stationId: null,
});

export default class CheckIn extends _CheckIn {
  static fromJS(checkIn) {
    return (new this).merge({
      id: checkIn.id,
      stationId: checkIn.station_id,
    });
  }
}

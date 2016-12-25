import { Record } from 'immutable';
import Line from './line';

const _Station = Record({
  id: null,
  name: "",
  nameKana: "",
  line: new Line(),
  haveCheckedIn: false,
});

export default class Station extends _Station {
  static fromJS(station) {
    return (new this).merge({
      id: station.id,
      name: station.name,
      nameKana: station.name_kana,
      line: Line.fromJS(station.line),
    });
  }
}

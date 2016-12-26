import { Record } from 'immutable';
import Line from './line';

const _Station = Record({
  id: null,
  name: "",
  nameKana: "",
  foundCount: 0,
  line: new Line(),
  haveCheckedIn: false,
  haveFound: false,
});

export default class Station extends _Station {
  static fromJS(station) {
    return (new this).merge({
      id: station.id,
      name: station.name,
      nameKana: station.name_kana,
      foundCount: station.found_count,
      line: Line.fromJS(station.line),
    });
  }
}

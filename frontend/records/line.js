import { Record } from 'immutable';

const _Line = Record({
  id: null,
  name: "",
  nameKana: "",
});

export default class Line extends _Line {
  static fromJS(line) {
    return (new this).merge({
      id: line.id,
      name: line.name,
      nameKana: line.name_kana,
    });
  }
}

import { Record } from 'immutable';

const _User = Record({
  id: null,
  nickName: "",
});

export default class User extends _User {
  static fromJS(user) {
    return (new this).merge({
      id: user.id,
      nickName: user.nick_name,
    });
  }
}

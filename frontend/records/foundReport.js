import { Record } from 'immutable';
import Station from '../records/station';
import User from '../records/user';

const _FoundReport = Record({
  id: null,
  imageUrl: "",
  comment: "",
  station: new Station(),
  user: new User(),
});

export default class FoundReport extends _FoundReport {
  static fromJS(report) {
    return (new this).merge({
      id: report.id,
      imageUrl: report.image_url,
      comment: report.comment,
      station: Station.fromJS(report.station),
      user: User.fromJS(report.user),
    });
  }
}

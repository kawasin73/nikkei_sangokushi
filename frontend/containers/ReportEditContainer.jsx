import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {updateFoundReport} from '../actions/station';

class ReportEditContainer extends Component {

  constructor(props) {
    super(props);
    const report = this.report();
    this.state = {
      comment: report.comment,
      image: undefined,
    };
  }

  componentDidMount() {
    const report = this.report();
    if (!report) {
      this.context.router.push("/mypage");
    }
  }

  report() {
    return this.props.foundReports.find((report) => `${report.station.id}` === this.props.params.stationId);
  }

  station() {
    return this.props.stations.find((station) => `${station.id}` === this.props.params.stationId);
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  onChangeImage(e) {
    this.setState({
      image: (e.target.files[0]),
    });
  }

  async onSubmit() {
    await this.props.updateFoundReport(this.report().id, this.state.comment, this.state.image);
    this.context.router.push("/mypage");
  }

  onDelete() {
    // TODO:
  }

  render() {
    const station = this.station();
    return (
      <div>
        <h1>発見報告: {station.name} - {station.line.name}</h1>
        <p>コメント</p>
        <textarea value={this.state.comment} onChange={this.onChangeComment.bind(this)}/>
        <p>画像</p>
        <img src={this.report().imageUrl}/>
        <input type="file" onChange={this.onChangeImage.bind(this)}/>
        <button onClick={this.onSubmit.bind(this)}>更新</button>
        <button>削除</button>
      </div>
    );
  }
}

ReportEditContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    stations: state.station.stations,
    foundReports: state.station.foundReports,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateFoundReport,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportEditContainer)

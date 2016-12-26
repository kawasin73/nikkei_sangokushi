import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {createFoundReport} from '../actions/station';

class ReportNewContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      image: undefined,
    };
  }

  componentDidMount() {
    const station = this.station();
    if (!station || station.haveFound) {
      this.context.router.push("/mypage");
    }
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
    await this.props.createFoundReport(this.props.params.stationId, this.state.comment, this.state.image);
    this.context.router.push("/mypage");
  }

  render() {
    const station = this.station();
    return (
      <div>
        <h1>発見報告: {station.name} - {station.line.name}</h1>
        <p>コメント</p>
        <textarea value={this.state.comment} onChange={this.onChangeComment.bind(this)}/>
        <p>画像</p>
        <input type="file" onChange={this.onChangeImage.bind(this)}/>
        <button onClick={this.onSubmit.bind(this)} disabled={this.props.station.isSubmittingReport}>登録</button>
      </div>
    );
  }
}

ReportNewContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    station: state.station,
    stations: state.station.stations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createFoundReport,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportNewContainer)

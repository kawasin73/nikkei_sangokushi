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

  onSubmit() {
    this.props.createFoundReport(this.props.params.stationId, this.state.comment, this.state.image);
  }

  render() {
    return (
      <div>
        new{this.props.params.stationId}
        <p>コメント</p>
        <textarea value={this.state.comment} onChange={this.onChangeComment.bind(this)}/>
        <p>画像</p>
        <input type="file" onChange={this.onChangeImage.bind(this)}/>
        <button onClick={this.onSubmit.bind(this)}>登録</button>
      </div>
    );
  }
}

ReportNewContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {}
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
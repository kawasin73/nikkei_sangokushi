import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {refreshCheckIns} from '../actions/station';

class MyPageContainer extends Component {

  componentDidMount() {
    this.props.refreshCheckIns();
  }

  render() {
    return (
      <div>
        MyPage
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    refreshCheckIns,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageContainer)

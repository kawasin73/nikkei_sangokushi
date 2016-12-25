import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MyPageController extends Component {

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
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageController)

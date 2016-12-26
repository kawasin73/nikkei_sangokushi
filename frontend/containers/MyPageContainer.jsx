import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { refreshCheckIns, refreshFoundReports } from '../actions/station';
import { initialized } from '../actions/myPage';

class MyPageContainer extends Component {

  componentDidMount() {
    if (!this.checkSignState(this.props)) {
      return;
    }
    this.init();
  }

  async init() {
    await this.props.refreshCheckIns();
    await this.props.refreshFoundReports();
    await this.props.initialized();
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    this.checkSignState(nextProps);
  }

  checkSignState(props) {
    console.log("props.authManager.isSignedIn()", props.authManager.isSignedIn());
    if (!props.authManager.isSignedIn()) {
      this.context.router.push("/");
      return false
    } else {
      return true;
    }
  }

  render() {
    return (
      <div>
        {
          this.props.myPageManager.isInitialized ? (
            this.props.children
          ) : (
            <p>Now Loading...</p>
          )
        }
      </div>
    );
  }
}

MyPageContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    authManager: state.main.authManager,
    myPageManager: state.main.myPageManager,
    stations: state.station.stations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    refreshCheckIns,
    refreshFoundReports,
    initialized,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageContainer)

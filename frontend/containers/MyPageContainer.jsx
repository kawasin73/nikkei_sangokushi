import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { refreshCheckIns, createCheckIn, deleteCheckIn } from '../actions/station';

class MyPageContainer extends Component {

  componentDidMount() {
    if (!this.checkSignState(this.props)) {
      return;
    }
    this.props.refreshCheckIns();
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

  onClickCheckIn(station) {
    if (station.haveCheckedIn) {
      this.props.deleteCheckIn(station);
    } else {
      this.props.createCheckIn(station);
    }
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
          {
            this.props.stations.map((station) => this.renderStation(station))
          }
          </tbody>
        </table>
      </div>
    );
  }

  renderStation(station) {
    return (
      <tr key={`station-${station.id}`}>
        <td>{station.name}</td>
        <td>{station.line.name}</td>
        <td><input type="checkbox" checked={station.haveCheckedIn} onChange={this.onClickCheckIn.bind(this, station)}/>
        </td>
      </tr>
    )
  }
}

MyPageContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    authManager: state.main.authManager,
    stations: state.station.stations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    refreshCheckIns,
    createCheckIn,
    deleteCheckIn,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPageContainer)

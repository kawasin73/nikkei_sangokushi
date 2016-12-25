import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadStations } from '../actions/station';

class MainContainer extends Component {

  componentDidMount() {
    console.log("componentDidMount")
    this.props.loadStations();
  }

  render() {
    return (
      <div>
        hello world3
        <ul>
        {
          this.props.stations.map((station) => {
            return (
              <li key={station.id}>
              <Link to={`/stations/${station.id}`}>{station.name}: {station.line.name}</Link>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stations: state.station.stations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadStations,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)

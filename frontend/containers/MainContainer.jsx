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
        {
          this.props.stations.map((station) => {
            return (
              <p key={station.id}>{station.name}</p>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stations: state.stations.stations,
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

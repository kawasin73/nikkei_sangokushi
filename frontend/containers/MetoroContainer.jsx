import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadStations } from '../actions/station';

import Header from '../components/Header';

class MetoroContainer extends Component {

  componentDidMount() {
    console.log("componentDidMount")
    this.props.loadStations();
  }

  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
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
)(MetoroContainer)

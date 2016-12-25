import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class StationContainer extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        Station{this.props.params.stationId}
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
)(StationContainer)

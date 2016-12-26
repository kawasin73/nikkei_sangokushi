import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MainContainer extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <table>
          <thead>
          <th>駅名</th>
          <th>路線名</th>
          <th>広告の発見数</th>
          </thead>
          <tbody>
          {
            this.props.stations.map((station) => {
              return (
                <tr key={station.id}>
                  <td><Link to={`/stations/${station.id}`}>{station.name}</Link></td>
                  <td>{station.line.name}</td>
                  <td>{station.foundCount}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
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
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)

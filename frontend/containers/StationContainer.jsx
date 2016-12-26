import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  { loadStationReports, clearStationReports } from '../actions/station';

class StationContainer extends Component {

  componentDidMount() {
    this.props.clearStationReports();
    this.props.loadStationReports(this.props.params.stationId);
  }

  station() {
    return this.props.stations.find((station) => `${station.id}` === this.props.params.stationId);
  }

  render() {
    const station = this.station();
    return (
      <div>
        {
          station ? (
            <div>
              <h1>{station.name} - {station.line.name}</h1>
              <p>発見報告数: {station.foundCount}</p>
              {
                this.props.reports.size > 0 ? (
                  this.renderReports()
                ) : (
                  <p>まだ発見されていません。</p>
                )
              }
            </div>
          ) : (
            <p>Not Found</p>
          )
        }
      </div>
    );
  }

  renderReports() {
    return (
      <table>
        <tbody>
        {
          this.props.reports.map((report) => {
            return (
              <tr key={`report-${report.id}`}>
                <td>{ report.imageUrl ? (<img src={report.imageUrl}/>) : (null)}</td>
                <td><p>{report.comment}</p></td>
                <td><p>{report.user.nickName}</p></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('state',state);
  return {
    stations: state.station.stations,
    reports: state.station.stationReports,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadStationReports,
    clearStationReports,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationContainer)

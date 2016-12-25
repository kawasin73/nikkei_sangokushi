import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showSignUpModel, showSignInModel, hideModal, signIn, signUp, signOut } from '../actions/auth';
import { loadStations } from '../actions/station';

import Header from '../components/Header';
import AuthModal from '../components/AuthModal';

class MetoroContainer extends Component {

  componentDidMount() {
    console.log("componentDidMount")
    this.props.loadStations();
  }

  canShowChildren() {
    return this.props.stationManager.isInitialized;
  }

  onClickSignIn() {
    this.props.showSignInModel();
  }

  onClickSignUp() {
    this.props.showSignUpModel();
  }

  onClickSignOut() {
    this.props.signOut();
  }

  onSignIn(nickName, password) {
    this.props.signIn(nickName, password);
  }

  onSignUp(nickName, password) {
    this.props.signUp(nickName, password);
  }

  onRequestCloseAuthModal() {
    this.props.hideModal();
  }

  render() {
    return (
      <div>
        <Header
          authManager={this.props.authManager}
          onClickSignIn={this.onClickSignIn.bind(this)}
          onClickSignUp={this.onClickSignUp.bind(this)}
          onClickSignOut={this.onClickSignOut.bind(this)}
        />
        { this.canShowChildren() ? (this.props.children) : (null)}
        <AuthModal
          authManager={this.props.authManager}
          onSignIn={this.onSignIn.bind(this)}
          onSignUp={this.onSignUp.bind(this)}
          onRequestClose={this.onRequestCloseAuthModal.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authManager: state.main.authManager,
    stationManager: state.station,
    stations: state.station.stations,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadStations,
    showSignUpModel,
    showSignInModel,
    hideModal,
    signIn,
    signUp,
    signOut,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetoroContainer)

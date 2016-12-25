import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules'
import Modal from 'react-modal';

import styles from './AuthModal.scss';


class AuthModal extends Component {

  propTypes: {
    authManager: PropTypes.object.isRequired,
    onSignIn: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      nickName: "",
      password: "",
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.authManager.isSignedIn() && nextProps.authManager.isSignedIn()) {
      this.resetInput();
    }
  }

  resetInput() {
    this.setState({
      nickName: "",
      password: "",
    })
  }

  isOpen() {
    return this.props.authManager.showSignInModal || this.props.authManager.showSignUpModal;
  }

  submitLabel() {
    if (this.props.authManager.showSignInModal) {
      return "ログイン";
    } else if (this.props.authManager.showSignUpModal) {
      return "登録";
    } else {
      return "";
    }
  }

  onChangeNickName(e) {
    this.setState({
      nickName: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit() {
    if (this.props.authManager.showSignInModal) {
      this.props.onSignIn(this.state.nickName, this.state.password);
    } else if (this.props.authManager.showSignUpModal) {
      this.props.onSignUp(this.state.nickName, this.state.password);
    }
  }

  render() {
    return (
      <Modal isOpen={this.isOpen()} contentLabel="AuthModal" onRequestClose={this.props.onRequestClose}>
        <div styleName="base">
          <p>id</p>
          <input onChange={this.onChangeNickName.bind(this)} value={this.state.nickName}/>
          <p>password</p>
          <input onChange={this.onChangePassword.bind(this)} value={this.state.password}/>
          <button onClick={this.onSubmit.bind(this)}>{this.submitLabel()}</button>
        </div>
      </Modal>
    );
  }
}

export default CSSModules(AuthModal, styles)

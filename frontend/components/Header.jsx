import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules'

import styles from './Header.scss';


class Header extends Component {

  propTypes: {
    authManager: PropTypes.object.isRequired,
    onClickSignIn: PropTypes.func.isRequired,
    onClickSignUp: PropTypes.func.isRequired,
    onClickSignOut: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div styleName="base">
        <div>
          {
            this.props.authManager.isSignedIn() ? (
            <div>
              <Link to="/mypage">{this.props.authManager.currentUser.nickName}</Link>
              <a href="javascript:void(0)" onClick={this.props.onClickSignOut}>SignOut</a>
            </div>
            ) : (
              <div>
                <a href="javascript:void(0)" onClick={this.props.onClickSignUp}>SignUp</a>
                <a href="javascript:void(0)" onClick={this.props.onClickSignIn}>SignIn</a>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default CSSModules(Header, styles)

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
          <Link styleName="title" to="/">東京メトロ 日経新聞三国志広告の旅</Link>
          {
            this.props.authManager.isSignedIn() ? (
              <div styleName="right">
                <Link styleName="button" to="/mypage">{this.props.authManager.currentUser.nickName}</Link>
                <a styleName="button" href="javascript:void(0)" onClick={this.props.onClickSignOut}>SignOut</a>
              </div>
            ) : (
              <div styleName="right">
                <a styleName="button" href="javascript:void(0)" onClick={this.props.onClickSignUp}>SignUp</a>
                <a styleName="button" href="javascript:void(0)" onClick={this.props.onClickSignIn}>SignIn</a>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default CSSModules(Header, styles)

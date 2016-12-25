import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules'

import styles from './Header.scss';

class Header extends Component {

  render() {
    return (
      <div styleName="base">
        header
      </div>
    );
  }
}

export default CSSModules(Header, styles)

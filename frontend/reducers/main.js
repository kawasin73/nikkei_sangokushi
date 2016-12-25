import { combineReducers } from 'redux';
import { List } from 'immutable';

import AuthActions from '../actions/auth';

import auth from '../api/auth';

import AuthManager from '../records/authManager';

function authManager(state = new AuthManager({ isSignedIn: auth.isSignedIn() }), action) {
  switch (action.type) {
    case AuthActions.SHOW_SIGN_IN_MODAL:
      return state.set('showSignInModal', true).set('showSignUpModal', false);
    case AuthActions.SHOW_SIGN_UP_MODAL:
      return state.set('showSignInModal', false).set('showSignUpModal', true);
    case AuthActions.HIDE_MODAL:
      return state.set('showSignInModal', false).set('showSignUpModal', false);
    case AuthActions.SET_IS_SIGNED_IN:
      return state.set('isSignedIn', action.isSignedIn);
    default:
      return state;
  }
}

export default combineReducers({
  authManager,
})

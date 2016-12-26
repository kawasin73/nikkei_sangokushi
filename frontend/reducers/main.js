import { combineReducers } from 'redux';
import { List } from 'immutable';

import AuthActions from '../actions/auth';
import MyPageActions from '../actions/myPage';

import auth from '../api/auth';

import AuthManager from '../records/authManager';
import MyPageManager from '../records/mypageManager';

function authManager(state = new AuthManager({ isSignedIn: auth.isSignedIn(), currentUser: auth.user }), action) {
  switch (action.type) {
    case AuthActions.SHOW_SIGN_IN_MODAL:
      return state.set('showSignInModal', true).set('showSignUpModal', false);
    case AuthActions.SHOW_SIGN_UP_MODAL:
      return state.set('showSignInModal', false).set('showSignUpModal', true);
    case AuthActions.HIDE_MODAL:
      return state.set('showSignInModal', false).set('showSignUpModal', false);
    case AuthActions.SET_CURRENT_USER:
      return state.set('currentUser', action.user);
    default:
      return state;
  }
}

function myPageManager(state = new MyPageManager(), action) {
  switch (action.type) {
    case MyPageActions.INITIALIZED: {
      return state.set('isInitialized', true);
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  authManager,
  myPageManager,
})

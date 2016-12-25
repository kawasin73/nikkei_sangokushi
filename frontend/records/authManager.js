import { Record } from 'immutable';

const _AuthManager = Record({
  currentUser: null,
  showSignInModal: false,
  showSignUpModal: false,
});

export default class AuthManager extends _AuthManager {
  isSignedIn() {
    return this.currentUser !== null;
  }
}

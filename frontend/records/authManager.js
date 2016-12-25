import { Record } from 'immutable';

const _AuthManager = Record({
  isSignedIn: false,
  showSignInModal: false,
  showSignUpModal: false,
});

export default class AuthManager extends _AuthManager {
}

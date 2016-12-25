import { createAuthClient } from './client';

import User from '../records/user';

const keyAccessToken = "AuthManager/accessToken";
const keyRefreshToken = "AuthManager/refreshToken";
const keyId = "AuthManager/id";
const keyNickName = "AuthManager/nickName";

class AuthManager {
  constructor() {
    this.accessToken = localStorage.getItem(keyAccessToken);
    this.refreshToken = localStorage.getItem(keyRefreshToken);
    if (localStorage.getItem(keyId) !== null) {
      this.user = new User({ id: localStorage.getItem(keyId), nickName: localStorage.getItem(keyNickName) });
    } else {
      this.user = null;
    }
    this.client = createAuthClient(this.accessToken);
    console.log('on construct AuthManager')
    console.log('this.accessToken', this.accessToken);
  }

  saveToken(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.client = createAuthClient(accessToken);
    localStorage.setItem(keyAccessToken, accessToken);
    localStorage.setItem(keyRefreshToken, refreshToken);
  }

  saveCurrentUser(user) {
    this.user = user;
    localStorage.setItem(keyId, user.id);
    localStorage.setItem(keyNickName, user.nickName);
  }

  signOut() {
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    localStorage.removeItem(keyId);
    localStorage.removeItem(keyNickName);
    localStorage.removeItem(keyAccessToken);
    localStorage.removeItem(keyRefreshToken);
  }

  isSignedIn() {
    return this.accessToken !== null;
  }
}

const authManager = new AuthManager();

export default authManager;

import { createAuthClient } from './client';

const keyAccessToken = "AuthManager/accessToken";
const keyRefreshToken = "AuthManager/refreshToken";

class AuthManager {
  constructor() {
    this.accessToken = localStorage.getItem(keyAccessToken);
    this.refreshToken = localStorage.getItem(keyRefreshToken);
    this.client = createAuthClient(this.accessToken);
  }

  saveToken(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.client = createAuthClient(accessToken);
    localStorage.setItem(keyAccessToken, accessToken);
    localStorage.setItem(keyRefreshToken, refreshToken);
  }

  isSignedIn() {
    return this.accessToken !== null;
  }
}

const authManager = new AuthManager();

export default authManager;

import * as request from '../api/request';

const Actions = {
  SET_LOADING: 'auth/set_loading',
  SHOW_SIGN_UP_MODAL: 'auth/show_sign_up_modal',
  SHOW_SIGN_IN_MODAL: 'auth/show_sign_in_modal',
  HIDE_MODAL: 'auth/hide_modal',
  SET_IS_SIGNED_IN: 'auth/set_is_signed_in',
};

export default Actions;

export function showSignUpModel() {
  return {
    type: Actions.SHOW_SIGN_UP_MODAL,
  }
}

export function showSignInModel() {
  return {
    type: Actions.SHOW_SIGN_IN_MODAL,
  }
}

export function hideModal() {
  return {
    type: Actions.HIDE_MODAL,
  }
}

export function signUp(nickName, password) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const result = await request.signUp(nickName, password);
      if (result) {
        dispatch(setIsSignedIn(true))
      }
    } catch (error) {
      // TODO: error handling
    }
    dispatch(setLoading(false));
  };
}

export function signIn(nickName, password) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const result = await request.signIn(nickName, password);
      if (result) {
        dispatch(setIsSignedIn(true))
      }
    } catch (error) {
      // TODO: error handling
    }
    dispatch(setLoading(false));
  };
}

function setLoading(loading) {
  return {
    type: Actions.SET_LOADING,
    loading,
  };
}

function setIsSignedIn(isSignedIn) {
  return {
    type: Actions.SET_IS_SIGNED_IN,
    isSignedIn,
  };
}


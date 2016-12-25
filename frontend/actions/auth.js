import * as request from '../api/request';

const Actions = {
  SET_LOADING: 'auth/set_loading',
  SHOW_SIGN_UP_MODAL: 'auth/show_sign_up_modal',
  SHOW_SIGN_IN_MODAL: 'auth/show_sign_in_modal',
  HIDE_MODAL: 'auth/hide_modal',
  SET_CURRENT_USER: 'auth/set_current_user',
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
  return async(dispatch) => {
    dispatch(setLoading(true));
    try {
      const user = await request.signUp(nickName, password);
      if (user) {
        dispatch(setCurrentUser(user))
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
    dispatch(hideModal());
  };
}

export function signIn(nickName, password) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try {
      const user = await request.signIn(nickName, password);
      if (user) {
        dispatch(setCurrentUser(user))
      }
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
    dispatch(setLoading(false));
    dispatch(hideModal());
  };
}

export function signOut() {
  return async(dispatch) => {
    await request.signOut();
    dispatch(setCurrentUser(null));
  };
}

function setLoading(loading) {
  return {
    type: Actions.SET_LOADING,
    loading,
  };
}

function setCurrentUser(user) {
  return {
    type: Actions.SET_CURRENT_USER,
    user,
  };
}

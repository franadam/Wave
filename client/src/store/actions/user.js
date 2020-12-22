import axios from 'axios';

import { errorAuth, clearError } from './';

import { AUTH_SIGNIN, AUTH_SIGNUP } from './types';

const authSignin = (success) => ({
  type: AUTH_SIGNIN,
  success,
});

const authSignup = (success) => ({
  type: AUTH_SIGNUP,
  success,
});

export const signin = (credential) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/users/signin`, credential);
    const { success, error } = res.data;
    dispatch(authSignin(success));
    dispatch(clearError('auth'));
    if (error) throw new Error(error);
  } catch (error) {
    dispatch(errorAuth(error.message));
  }
};

export const signup = (credential) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/users/signup`, credential);
    const { success, error } = res.data;
    dispatch(authSignup(success));
    dispatch(clearError('auth'));
    if (error) throw new Error(error);
  } catch (error) {
    dispatch(errorAuth(error.message));
  }
};

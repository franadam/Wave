import axios from 'axios';

import { errorAuth, clearError } from './';

import { AUTH_SIGNIN, AUTH_SIGNUP, AUTH_LOGOUT, USER_READ } from './types';

const authSignin = (success) => ({
  type: AUTH_SIGNIN,
  success,
});

const authSignup = (success) => ({
  type: AUTH_SIGNUP,
  success,
});

const authLogout = (success) => ({
  type: AUTH_LOGOUT,
  success,
});

const userRead = (user) => ({
  type: USER_READ,
  user,
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

export const logout = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/logout`);
    const { success, error } = res.data;
    console.log('res.data :>> ', res.data);
    dispatch(authLogout(success));
    dispatch(clearError('auth'));
    if (error) throw new Error(error);
  } catch (error) {
    dispatch(errorAuth(error.message));
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/auth`);
    dispatch(userRead(res.data));
  } catch (error) {
    dispatch(errorAuth(error.message));
  }
};

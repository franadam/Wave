import axios from 'axios';

import { errorAuth, errorUsers ,clearError } from './';

import { AUTH_SIGNIN, AUTH_SIGNUP, AUTH_LOGOUT, USER_READ, USER_ADD_GUITAR_TO_BASKET } from './types';

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

const userAddGuitarToBasket = (basket) => ({
  type: USER_ADD_GUITAR_TO_BASKET,
  basket,
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

export const addGuitarToBasket = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/users/add_to_basket?id=${id}`);
    if (res.data.error) throw new Error(res.data.error);
    dispatch(userAddGuitarToBasket(res.data));
    dispatch(clearError('user'));
  } catch (error) {
    dispatch(errorUsers(error.message));
  }
};

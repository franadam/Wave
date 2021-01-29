import axios from 'axios';

import { errorAuth, errorUsers ,clearError } from './';

import { AUTH_SIGNIN, AUTH_SIGNUP, AUTH_LOGOUT, USER_READ, USER_ADD_GUITAR_TO_BASKET, USER_READ_BASKET, USER_DELETE_BASKET_ITEM, USER_UPDATE } from './types';

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

const userUpdate = (user) => ({
  type: USER_UPDATE,
  user,
});

const userAddGuitarToBasket = (id) => ({
  type: USER_ADD_GUITAR_TO_BASKET,
  id,
});

const userDeleteGuitarFromBasket = (id) => ({
  type: USER_DELETE_BASKET_ITEM,
  id
})

export const fetchBasketDetails = (basket) => ({
  type: USER_READ_BASKET,
  basket,
})

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

export const editUser = (credential) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/users/edit_profile`, credential);
    const {success, user, error} = res.data;
    if (error||!success) throw new Error(error);
    dispatch(userUpdate(user));
  } catch (error) {
    dispatch(errorAuth(error.message));
  }
};

export const addGuitarToBasket = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/users/add_to_basket?id=${id}`);
    if (res.data.error) throw new Error(res.data.error);
    dispatch(userAddGuitarToBasket(id));
    dispatch(clearError('user'));
  } catch (error) {
    dispatch(errorUsers(error.message));
  }
}

export const deleteGuitarFromBasket = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/users/remove_from_basket?id=${id}`);
    if (res.data.error) throw new Error(res.data.error);
    dispatch(userDeleteGuitarFromBasket( id));
    dispatch(clearError('user'));
  } catch (error) {
    dispatch(errorUsers(error.message));
  }
};

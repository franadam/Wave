import {
  AUTH_SIGNIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  USER_READ,
} from '../actions/types';

const initialState = {
  signin: false,
  signup: false,
  logout: false,
  info: {},
};

const logout = (state, success) => {
  return { ...initialState, logout: success };
};

const reducer = (state = initialState, { type, success, user }) => {
  switch (type) {
    case AUTH_SIGNIN:
      return { ...state, signup: true, signin: success };

    case AUTH_SIGNUP:
      return { ...state, signup: success };

    case USER_READ:
      return { ...state, info: user, signup: true, signin: true };

    case AUTH_LOGOUT:
      return { ...state, logout: success };
    default:
      return state;
  }
};

export default reducer;

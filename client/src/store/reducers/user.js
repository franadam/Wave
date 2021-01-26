import {
  AUTH_SIGNIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  USER_READ,
  USER_ADD_GUITAR_TO_BASKET
} from '../actions/types';

const initialState = {
  signin: false,
  signup: false,
  logout: false,
  info: {},
};

const reducer = (state = initialState, { type, success, user, basket }) => {
  switch (type) {
    case AUTH_SIGNIN:
      return { ...state, signup: true, signin: success };

    case AUTH_SIGNUP:
      return { ...state, signup: success };

    case USER_READ:
      return { ...state, info: user, signup: true, signin: true };

    case AUTH_LOGOUT:
      return { ...state, logout: success };

    case USER_ADD_GUITAR_TO_BASKET:
      return { ...state, info: {...state.info, basket }};
    default:
      return state;
  }
};

export default reducer;

import {
  AUTH_SIGNIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  USER_READ,
  USER_ADD_GUITAR_TO_BASKET,
  USER_READ_BASKET,
  USER_DELETE_BASKET_ITEM,
  USER_UPDATE
} from '../actions/types';

const initialState = {
  signin: false,
  signup: false,
  logout: false,
  info: {},
  basket: []
};

const reducer = (state = initialState, { type, success, user, basket, id }) => {
  switch (type) {
    case AUTH_SIGNIN:
      return { ...state, signup: true, signin: success };

    case AUTH_SIGNUP:
      return { ...state, signup: success };

    case USER_READ:
      return { ...state, info: user, signup: true, signin: true };

    case AUTH_LOGOUT:
      return { ...state, logout: success };

    case USER_UPDATE:
      return {...state, info: user}

    case USER_ADD_GUITAR_TO_BASKET:
      return { ...state, info: {...state.info, basket:[...state.info.basket, id] }};

    case USER_READ_BASKET:
      return {...state, basket}

    case USER_DELETE_BASKET_ITEM:
      return { ...state, basket: state.basket.filter(item => item._id != id), info: {...state.info, basket:state.info.basket.filter(item => item.id != id) }};
    default:
      return state;
  }
};

export default reducer;

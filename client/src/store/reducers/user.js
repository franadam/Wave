import { AUTH_SIGNIN, AUTH_SIGNUP } from '../actions/types';

const initialState = {
  signin: false,
  signup: false,
};

const reducer = (state = initialState, { type, success }) => {
  switch (type) {
    case AUTH_SIGNIN:
      return { ...state, signin: success };

    case AUTH_SIGNUP:
      return { ...state, signup: success };

    default:
      return state;
  }
};

export default reducer;

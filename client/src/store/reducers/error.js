import { CLEAR_ERROR, ERROR_AUTH, ERROR_USER } from '../actions/types';

const initialState = {
  auth: null,
  user: null,
};

const clearError = (state, slice) =>
  Object.assign({}, { ...state, [slice]: null });

const reducer = (state = initialState, { type, error, slice }) => {
  switch (type) {
    case ERROR_AUTH:
      return Object.assign({}, { ...state, auth: error });
    case ERROR_USER:
      return Object.assign({}, { ...state, user: error });
    case CLEAR_ERROR:
      return clearError(state, slice);
    default:
      return state;
  }
};

export default reducer;

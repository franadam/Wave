import { combineReducers } from 'redux';

import userReducer from './user';
import errorReducer from './error';

const reducer = combineReducers({
  user: userReducer,
  error: errorReducer,
});

export default reducer;

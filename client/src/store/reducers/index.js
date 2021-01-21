import { combineReducers } from 'redux';

import userReducer from './user';
import productReducer from './product';
import errorReducer from './error';

const reducer = combineReducers({
  user: userReducer,
  product: productReducer,
  error: errorReducer,
});

export default reducer;

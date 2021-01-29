import { combineReducers } from 'redux';

import userReducer from './user';
import productReducer from './product';
import siteReducer from './site';
import errorReducer from './error';

const reducer = combineReducers({
  user: userReducer,
  product: productReducer,
  site: siteReducer,
  error: errorReducer,
});

export default reducer;

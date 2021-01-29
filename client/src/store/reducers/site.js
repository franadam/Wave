import { FETCH_SITE_INFO, SITE_INFO_UPDATE } from '../actions/types';

const initialState = {

}

const reducer = (state = initialState, { type, success, site }) => {
  switch (type) {
    case FETCH_SITE_INFO:
      return { ...state, info : {...site}, success };

    case SITE_INFO_UPDATE:
      return { ...state, info : {...site}, success };

    default:
      return state;
  }
}

export default reducer;
import { FETCH_GUITARS_BY_ARRIVAL, FETCH_GUITARS_BY_SELL, FETCH_WOODS, FETCH_BRANDS } from '../actions/types';

const initialState = {

}

const reducer = (state = initialState, { type, products, woods, brands }) => {
  switch (type) {
    case FETCH_GUITARS_BY_ARRIVAL:
      return { ...state, byArrival : products }

    case FETCH_GUITARS_BY_SELL:
      return { ...state, bySell : products }

    case FETCH_WOODS:
      return { ...state, woods }

    case FETCH_BRANDS:
      return { ...state, brands }

  default:
    return state
  }
}

export default reducer;

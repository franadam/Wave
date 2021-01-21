import { FETCH_GUITARS_BY_ARRIVAL, FETCH_GUITARS_BY_SELL, FETCH_WOODS, FETCH_BRANDS, PURCHASE_GUITARS } from '../actions/types';

const initialState = {

}

const reducer = (state = initialState, { type, guitars, woods, brands, size, articles }) => {
  switch (type) {
    case FETCH_GUITARS_BY_ARRIVAL:
      return { ...state, byArrival : guitars }

    case FETCH_GUITARS_BY_SELL:
      return { ...state, bySell : guitars }

    case FETCH_WOODS:
      return { ...state, woods }

    case FETCH_BRANDS:
      return { ...state, brands }

    case PURCHASE_GUITARS:
      return {...state, toShop: articles, toShopSize: size}
  default:
    return state
  }
}

export default reducer;

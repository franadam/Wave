import { FETCH_GUITARS_BY_ARRIVAL, FETCH_GUITARS_BY_SELL, FETCH_WOODS, FETCH_BRANDS, PURCHASE_GUITARS, GUITAR_CREATE, CLEAR_GUITAR, BRAND_CREATE, WOOD_CREATE } from '../actions/types';

const initialState = {

}

const createBrand = (state, brand) => {
  const brands = [...state.brands, brand]
  return Object.assign({}, state, {brands})
}

const createWood = (state, wood) => {
  const woods = [...state.woods, wood]
  return Object.assign({}, state, {woods})
}

const reducer = (state = initialState, { type, guitars, woods, wood, brands, brand, size, articles, addGuitar }) => {
  switch (type) {
    case FETCH_GUITARS_BY_ARRIVAL:
      return { ...state, byArrival : guitars }

    case FETCH_GUITARS_BY_SELL:
      return { ...state, bySell : guitars }

    case PURCHASE_GUITARS:
      return {...state, toShop: articles, toShopSize: size}

    case GUITAR_CREATE:
      return {...state, addGuitar}

    case CLEAR_GUITAR:
      return {...state, addGuitar: {}}

    case FETCH_WOODS:
      return { ...state, woods }

      case WOOD_CREATE:
        return createWood(state, wood)

    case FETCH_BRANDS:
      return { ...state, brands }

      case BRAND_CREATE:
        return createBrand(state, brand)

  default:
    return state
  }
}

export default reducer;

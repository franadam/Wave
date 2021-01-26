import { FETCH_GUITARS_BY_ARRIVAL,FETCH_GUITARS, FETCH_GUITARS_BY_SELL, FETCH_WOODS, FETCH_BRANDS, PURCHASE_GUITARS, GUITAR_CREATE, CLEAR_GUITAR, BRAND_CREATE, WOOD_CREATE } from '../actions/types';

const initialState = {
  guitars: {
  byId: {},
  allIds: [],
}, woods: {
  byId: {},
  allIds: [],
}, brands: {
  byId: {},
  allIds: [],
}
}

const fetchGuitars = (state, guitars) => {
  const byId = {};
  const allIds = [];
  guitars.forEach((guitar) => {
    byId[guitar._id] = guitar;
    allIds.push(guitar._id);
  });
  return Object.assign({}, { ...state, guitars:{byId, allIds} });
};

const fetchWoods = (state, woods) => {
  const byId = {};
  const allIds = [];
  woods.forEach((wood) => {
    byId[wood._id] = wood;
    allIds.push(wood._id);
  });
  return Object.assign({}, { ...state, woods:{byId, allIds} });
};

const fetchBrands = (state, brands) => {
  const byId = {};
  const allIds = [];
  brands.forEach((brand) => {
    byId[brand._id] = brand;
    allIds.push(brand._id);
  });
  return Object.assign({}, { ...state, brands:{byId, allIds} });
};

const createBrand = (state, brand) => {
  const byId = Object.assign({}, state.brands.byId);
  const allIds = state.brands.allIds.slice();
  allIds.push(brand._id);
  byId[brand._id] = brand;
  return Object.assign({}, { ...state, brands:{byId, allIds} });
};

const createWood = (state, wood) => {
  const byId = Object.assign({}, state.woods.byId);
  const allIds = state.woods.allIds.slice();
  allIds.push(wood._id);
  byId[wood._id] = wood;
  return Object.assign({}, { ...state, woods:{byId, allIds} });
};

const reducer = (state = initialState, { type, guitars, woods, wood, brands, brand, size, articles, addGuitar }) => {
  switch (type) {
    case FETCH_GUITARS:
      return fetchGuitars(state, guitars)

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
      return fetchWoods(state, woods)

      case WOOD_CREATE:
        return createWood(state, wood)

    case FETCH_BRANDS:
      return fetchBrands(state, brands)

      case BRAND_CREATE:
        return createBrand(state, brand)

  default:
    return state
  }
}

export default reducer;

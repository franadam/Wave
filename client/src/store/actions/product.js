import axios from 'axios';

import { errorProducts, clearError } from './';

import {FETCH_GUITARS, FETCH_GUITARS_BY_ARRIVAL, FETCH_GUITARS_BY_SELL, FETCH_BRANDS, FETCH_WOODS, PURCHASE_GUITARS, GUITAR_CREATE, CLEAR_GUITAR, BRAND_CREATE, WOOD_CREATE } from './types';

const getGuitars = (guitars) => ({
  type: FETCH_GUITARS,
  guitars
})

const getBrands = (brands) => ({
  type: FETCH_BRANDS,
  brands
})

const getWoods = (woods) => ({
  type: FETCH_WOODS,
  woods
})

const productReadBySell = (guitars) => ({
  type: FETCH_GUITARS_BY_SELL,
  guitars
})

const productReadByArrival = (guitars) => ({
  type: FETCH_GUITARS_BY_ARRIVAL,
  guitars
})

const getGuitarsToShop = ({size, articles}) => ({
  type: PURCHASE_GUITARS,
  size, articles
})

const createGuitar = (addGuitar) => ({
  type: GUITAR_CREATE,
  addGuitar
})

const createBrand = (brand) => ({
  type: BRAND_CREATE,
  brand
})

const createWood = (wood) => ({
  type: WOOD_CREATE,
  wood
})

export const clearGuitar = () => ({
  type: CLEAR_GUITAR,
})

export const fetchBrands = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/brands`)
    dispatch(getBrands(res.data.brands))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }}

export const fetchWoods = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/woods`)
    dispatch(getWoods(res.data.woods))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }}

export const fetchGuitars = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/guitars`)
    dispatch(getGuitars(res.data.guitars))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}

export const getGuitarsByArrival = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/guitars?sortBy=createdAt&order=desc&limit=50&skip=0`)
    dispatch(productReadByArrival(res.data.guitars))
    dispatch(getGuitars(res.data.guitars))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}

export const getGuitarsBySell = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/guitars?sortBy=sold&order=desc&limit=50&skip=0`)
    dispatch(productReadBySell(res.data.guitars))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}

export const purchaseGuitars = (skip, limit, filters=[], previousState=[]) => async (dispatch) => {
  try {
    const data = {skip, limit, filters}
    const res = await axios.post(`/api/products/shop`, data)
    const {size, articles} = res.data;
    const newState = [
      ...previousState,
      ...articles
    ]
    dispatch(getGuitarsToShop({size, articles: newState}))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}

export const addGuitar = (guitar) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/products/guitars`, guitar)
    dispatch(createGuitar(res.data.guitar))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}

export const addBrand = (brand) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/products/brands`, brand)
    dispatch(createBrand(res.data.brand))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}

export const addWood = (wood) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/products/woods`, wood)
    dispatch(createWood(res.data.wood))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}
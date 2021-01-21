import axios from 'axios';

import { errorProducts, clearError } from './';

import { FETCH_GUITARS_BY_ARRIVAL, FETCH_GUITARS_BY_SELL, FETCH_BRANDS, FETCH_WOODS, PURCHASE_GUITARS } from './types';

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

export const getGuitarsByArrival = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/guitars?sortBy=createdAt&order=desc&limit=50&skip=0`)
    dispatch(productReadByArrival(res.data.guitars))
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
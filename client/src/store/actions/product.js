import axios from 'axios';

import { errorProducts, clearError } from './';

import { FETCH_GUITARS_BY_ARRIVAL, FETCH_GUITARS_BY_SELL, FETCH_BRANDS, FETCH_WOODS } from './types';

const getBrands = (brands) => ({
  type: FETCH_BRANDS,
  brands
})

const getWoods = (woods) => ({
  type: FETCH_WOODS,
  woods
})

const productReadByArrival = (products) => ({
  type: FETCH_GUITARS_BY_ARRIVAL,
  products
})

const productReadBySell = (products) => ({
  type: FETCH_GUITARS_BY_SELL,
  products
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

export const getProductByArrival = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/guitars?sortBy=createdAt&order=desc&limit=50&skip=0`)
    dispatch(productReadByArrival(res.data.guitars))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}

export const getProductBySell = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/guitars?sortBy=sold&order=desc&limit=50&skip=0`)
    dispatch(productReadBySell(res.data.guitars))
    dispatch(clearError('product'));
  } catch (error) {
    dispatch(errorProducts(error.message))
  }
}
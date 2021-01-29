import { CLEAR_ERROR, ERROR_AUTH, ERROR_PRODUCT, ERROR_USER, ERROR_SITE_INFO } from './types';

export const errorAuth = (error) => ({
  type: ERROR_AUTH,
  error,
});

export const errorUsers = (error) => ({
  type: ERROR_USER,
  error,
});

export const errorProducts = (error) => ({
  type: ERROR_PRODUCT,
  error,
});

export const errorSiteInfo = (error) => ({
  type: ERROR_SITE_INFO,
  error,
});

export const clearError = (slice) => ({
  type: CLEAR_ERROR,
  slice,
});

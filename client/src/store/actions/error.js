import { CLEAR_ERROR, ERROR_AUTH, ERROR_USER } from './types';

export const errorAuth = (error) => ({
  type: ERROR_AUTH,
  error,
});

export const errorUsers = (error) => ({
  type: ERROR_USER,
  error,
});

export const clearError = (slice) => ({
  type: CLEAR_ERROR,
  slice,
});

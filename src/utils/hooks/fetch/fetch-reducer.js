import {
  FETCHING,
  RESPONSE_ERROR,
  RESPONSE_COMPLETE,
  RESET
} from './fetch-actions';

export const fetchReducer = (state, action) => {
  const { type, payload } = action;

  if (type === FETCHING) {
    return {
      loading: true,
      error: null,
      result: null
    };
  }
  if (type === RESPONSE_COMPLETE) {
    const { res } = payload;
    return {
      loading: false,
      error: null,
      result: res
    };
  }
  if (type === RESPONSE_ERROR) {
    return {
      loading: false,
      error: payload.error,
      result: null
    };
  }
  if (type === RESET) {
    return { loading: false, error: null, result: payload.res };
  }
  return state;
};

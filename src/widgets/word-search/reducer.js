// TODO separate related words
import { formatData } from './helpers';
import {
  FETCHING,
  SEARCH_INIT,
  RESPONSE_ERROR,
  RESPONSE_COMPLETE
} from './actions';

export const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === FETCHING) {
    return {
      loading: true,
      error: null,
      result: null
    };
  }
  if (type === RESPONSE_COMPLETE) {
    let result;
    const { res } = payload;
    if (res.some(i => typeof i === 'string') && res.length) {
      result = { suggestions: res };
    } else {
      result = formatData(res);
    }
    return {
      loading: false,
      error: null,
      result
    };
  }
  if (type === RESPONSE_ERROR) {
    return {
      loading: false,
      error: payload.error,
      result: null
    };
  }
  if (type === SEARCH_INIT) {
    return {
      ...state,
      searchQuery: payload.searchQuery
    };
  }
  return state;
};

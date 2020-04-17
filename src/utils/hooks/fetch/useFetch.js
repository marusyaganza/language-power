import { useRef, useCallback, useEffect } from 'react';
import {
  FETCHING,
  RESPONSE_COMPLETE,
  RESPONSE_ERROR,
  RESET
} from './fetch-actions';
import { useThunkReducer } from '../useThunkReducer';
import { fetchReducer } from './fetch-reducer';
import { initialState } from './initialState';

export const useFetch = (customInitialState = {}) => {
  const [state, dispatch] = useThunkReducer(fetchReducer, {
    ...initialState,
    ...customInitialState
  });

  const activeRequests = useRef([]);

  const sendRequest = useCallback(
    async ({ url, requestOptions = {}, query, formatData }) => {
      dispatch({
        type: FETCHING
      });
      const httpAbortCtrl = new AbortController();
      activeRequests.current.push(httpAbortCtrl);
      let res;
      try {
        const response = await fetch(url, {
          ...requestOptions,
          signal: httpAbortCtrl.signal
        });

        res = await response.json();

        activeRequests.current.filter(req => req !== httpAbortCtrl);

        if (!response.ok) {
          throw new Error(res);
        }
        dispatch({
          type: RESPONSE_COMPLETE,
          payload: {
            res: formatData ? formatData(res) : res,
            query
          }
        });
      } catch (err) {
        dispatch({
          type: RESPONSE_ERROR,
          payload: {
            error: res
          }
        });
      }
    },
    []
  );

  const resetData = newState => {
    dispatch({ type: RESET, payload: { res: newState } });
  };

  useEffect(() => {
    return () => {
      activeRequests.current.forEach(ctrl => {
        ctrl.abort();
      });
    };
  }, []);
  return [state, sendRequest, resetData];
};

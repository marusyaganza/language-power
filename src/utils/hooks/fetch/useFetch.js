import {
  FETCHING,
  RESPONSE_COMPLETE,
  RESPONSE_ERROR
} from '../../../widgets/word-search/actions';
import { useThunkReducer } from '../useThunkReducer';
import { fetchReducer } from './fetch-reducer';
import { initialState } from './initialState';

export const useFetch = () => {
  const [state, dispatch] = useThunkReducer(fetchReducer, initialState);

  const fetchFunc = async ({ url, requestOptions, query, formatData }) => {
    dispatch({
      type: FETCHING
    });
    let res;
    try {
      const response = await fetch(url, requestOptions);
      res = await response.json();
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
  };
  return [state, fetchFunc];
};

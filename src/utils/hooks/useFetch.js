import {
  FETCHING,
  RESPONSE_COMPLETE,
  RESPONSE_ERROR
} from '../../widgets/word-search/actions';

export const useFetch = ({ url, query, dispatch }) => {
  dispatch({
    type: FETCHING
  });
  fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: RESPONSE_COMPLETE,
        payload: {
          res,
          query
        }
      });
    })
    .catch(e => {
      dispatch({
        type: RESPONSE_ERROR,
        payload: {
          error: e
        }
      });
    });
};

export const FETCH_WORD = 'fetch_word';
import {API_KEY, LANG, YANDEX} from "../../api-data";
import axios from 'axios';
// Use mock beeing offline
// import mock from '../../mocks/yandex.mock';

export const fetchWord = (word = 'word') => async (dispatch, getState, api) => {
    const instance = api || axios;
    // const res = {};
    // res.data = mock;
    const res = await api.get(`${YANDEX}?key=${API_KEY}&lang=${LANG}&text=${word}`);
    dispatch({
        type: FETCH_WORD,
        payload: res.data
    });
};
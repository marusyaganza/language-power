export const FETCH_WORD = 'fetch_word';
import {API_KEY, LANG, YANDEX} from "../../api-data";
import axios from 'axios';

export const fetchWord = (word) => dispatch => {
    const res = axios.get(`${YANDEX}?key=${API_KEY}&lang=${LANG}&text=${word}`);
    res.then(res => dispatch({
            type: FETCH_WORD,
            payload: res.data
        }));
};
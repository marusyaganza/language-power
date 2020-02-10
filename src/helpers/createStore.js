import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {reducers} from "../reducers";
import axios from 'axios';
import {YANDEX} from "../../api-data";



export const createStoreFunc = (req) => {
    const axiosInstance = axios.create({
        baseURL: YANDEX,
        headers: {cookie: req.cookie || ''}
    });
    return createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
};


import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {reducers} from "../reducers";

export const createStoreFunc = () => createStore(reducers, {}, applyMiddleware(thunk));


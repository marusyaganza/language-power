import {combineReducers} from "redux";
import {wordReducer} from "./wordReducer";

export const reducers = combineReducers(
    {words: wordReducer}
);
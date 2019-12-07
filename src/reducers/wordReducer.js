import {FETCH_WORD} from "../actions";

export const wordReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_WORD : return action.payload.def;
        default: return state
    }
};
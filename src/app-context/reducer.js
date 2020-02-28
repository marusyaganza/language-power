import { ADD_CARD, DELETE_CARD } from './actions';

export const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ADD_CARD) {
    return payload.uuid ? [payload, ...state] : state;
  }
  if (type === DELETE_CARD) {
    return state.filter(word => word.uuid !== payload.uuid);
  }
  return state;
};

import { ADD_CARD, DELETE_CARD, LEARN_CARDS } from './actions';
import { saveGameData } from './helpers';

export const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ADD_CARD) {
    return payload.uuid ? [payload, ...state] : state;
  }
  if (type === DELETE_CARD) {
    return state.filter(word => word.uuid !== payload.uuid);
  }
  if (type === LEARN_CARDS) {
    return saveGameData(state, payload);
  }
  return state;
};

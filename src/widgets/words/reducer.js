import { ADD_WORD, LEARN } from './actions';

export const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ADD_WORD) {
    return [payload, ...state];
  }
  if (type === LEARN) {
    return state.map(word => {
      if (word.id === payload.id) {
        return { ...word, learnt: !word.learnt };
      }
      return word;
    });
  }
  return state;
};

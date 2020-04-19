import { ACTIONS } from './actions';
import { STATUSES } from './config';

export const gameReducer = (state, action) => {
  const { type, payload } = action;
  if (type === ACTIONS.LOADED) {
    const { qa, learntCards } = payload;
    return { ...state, qa, learntCards, status: STATUSES.STARTED };
  }
  if (type === ACTIONS.EMPTY) {
    return { ...state, status: STATUSES.LEARNT };
  }
  if (type === ACTIONS.SUCCESS) {
    const { currentIndex, qa } = state;
    const { text } = qa[currentIndex];
    const newResult = [...state.learntCards];
    newResult[state.currentIndex].result = 1;
    if (currentIndex < qa.length - 1) {
      return {
        ...state,
        currentIndex: currentIndex + 1,
        learntCards: newResult,
        status: STATUSES.SUCCESS,
        text
      };
    }
    return {
      ...state,
      isCompleted: true,
      status: STATUSES.COMPLETE,
      learntCards: newResult
    };
  }
  if (type === ACTIONS.ERROR) {
    const newResult = [...state.learntCards];
    newResult[state.currentIndex].result--;
    return {
      ...state,
      errorCount: state.errorCount + 1,
      learntCards: newResult,
      status: STATUSES.ERROR
    };
  }
  if (type === ACTIONS.COMPLETED) {
    return {
      ...state,
      status: STATUSES.SAVED,
      message: payload.message
    };
  }
  return state;
};

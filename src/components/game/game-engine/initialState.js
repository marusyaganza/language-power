import { STATUSES } from './config';

export const initialState = {
  errorCount: 0,
  currentIndex: 0,
  status: STATUSES.LOADING,
  qa: null,
  learntCards: null,
  isCompleted: false
};

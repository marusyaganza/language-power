import { CHANGE, TOUCH } from './input-actions';
import { validate } from '../../utils/validators';

export const inputReducer = (state, action) => {
  const { type, payload } = action;
  if (type === CHANGE) {
    const { value, validators } = payload;
    return { ...state, value, isValid: validate(value, validators) };
  }
  if (type === TOUCH) {
    return { ...state, isTouched: true };
  }
  return state;
};

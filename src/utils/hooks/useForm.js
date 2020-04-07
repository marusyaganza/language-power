import { useReducer, useCallback } from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';

const formReducer = (state, action) => {
  const { type, payload } = action;
  if (type === INPUT_CHANGE) {
    const { name, value, isValid } = payload;
    const inputs = {
      ...state.inputs,
      [name]: {
        value,
        isValid
      }
    };
    const elements = Object.values(inputs);
    const formIsValid = !elements.some(el => !el.isValid);
    return {
      ...state,
      isValid: formIsValid,
      inputs
    };
  }
  return state;
};

export const useForm = initialState => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const changeHandler = useCallback(
    ({ name, value, isValid }) => {
      dispatch({ type: INPUT_CHANGE, payload: { name, value, isValid } });
    },
    [dispatch]
  );
  return [state, changeHandler];
};

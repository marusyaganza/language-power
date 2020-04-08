import { useReducer, useCallback } from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';
const CONFIGURE_FORM = 'CONFIGURE_FORM';

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
  if (type === CONFIGURE_FORM) {
    const { fields, initialState } = payload;
    if (!fields || !initialState) {
      return state;
    }
    const fieldsKeys = fields.map(item => item.name);
    const { inputs } = state;
    const currentInputs = Object.keys(inputs);
    const newInputs = { ...inputs };
    let newFields;
    if (fieldsKeys.length === currentInputs.length) {
      return state;
    }
    if (fields.length > currentInputs.length) {
      newFields = fieldsKeys.filter(i => !newInputs.includes(i));
      newFields.forEach(field => {
        newInputs[field] = initialState[field];
        return {
          isValid: false,
          inputs: newInputs
        };
      });
    } else {
      newFields = currentInputs.filter(i => !fieldsKeys.includes(i));
      newFields.forEach(input => {
        delete newInputs[input];
      });
      return {
        isValid: state.isValid,
        inputs: newInputs
      };
    }
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

  const setFormData = useCallback(
    (fields, initialConfig) => {
      dispatch({
        type: CONFIGURE_FORM,
        payload: { fields, initialState: initialConfig }
      });
    },
    [dispatch]
  );
  return [state, changeHandler, setFormData];
};

import React, { useCallback, useReducer, createContext } from 'react';
import uuid from 'uuid';
import { reducer } from './reducer';
import { ADD_WORD, LEARN } from './actions';

export const WordContext = createContext();

// eslint-disable-next-line react/prop-types
export const WordProvider = ({ children, initialState }) => {
  const [words, dispatch] = useReducer(reducer, initialState);
  const onSubmit = useCallback(
    ({ text, def }) => {
      dispatch({
        type: ADD_WORD,
        payload: {
          text,
          def,
          id: uuid(),
          learnt: false
        }
      });
    },
    [dispatch]
  );

  const onCheck = useCallback(
    id => {
      dispatch({
        type: LEARN,
        payload: {
          id
        }
      });
    },
    [dispatch]
  );
  const value = { onCheck, onSubmit, words };
  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};

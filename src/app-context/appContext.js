import React, {
  useCallback,
  useReducer,
  createContext,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { ADD_CARD, DELETE_CARD } from './actions';
import { getWordCards, putCards } from './helpers';
import { reducer } from './reducer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = getWordCards() || [];
  const [wordCards, dispatch] = useReducer(reducer, initialState);
  const addWord = useCallback(
    card => {
      dispatch({
        type: ADD_CARD,
        payload: {
          ...card
        }
      });
    },
    [dispatch]
  );

  const deleteWord = useCallback(
    uuid => {
      dispatch({
        type: DELETE_CARD,
        payload: {
          uuid
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    putCards(wordCards);
  }, [wordCards]);

  const value = { wordCards, addWord, deleteWord };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node
};

AppProvider.defaultProps = {
  children: null
};

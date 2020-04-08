import React, {
  useCallback,
  useReducer,
  createContext,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { ADD_CARD, DELETE_CARD, LEARN_CARDS } from './actions';
import { getWordCards, putCards } from './helpers';
import { reducer } from './reducer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = getWordCards() || [];
  const [wordCards, dispatch] = useReducer(reducer, initialState);
  const [userId, setUserId] = useState(null);
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

  const learnWords = useCallback(
    ({ learntCards, gameId }) => {
      dispatch({
        type: LEARN_CARDS,
        payload: {
          learntCards,
          gameId
        }
      });
    },
    [dispatch]
  );

  const login = useCallback(id => {
    setUserId(id);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
  }, []);

  useEffect(() => {
    putCards(wordCards);
  }, [wordCards]);

  const value = {
    wordCards,
    addWord,
    deleteWord,
    learnWords,
    login,
    logout,
    userId
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node
};

AppProvider.defaultProps = {
  children: null
};

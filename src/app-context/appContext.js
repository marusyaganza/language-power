import React, { useCallback, createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../utils/hooks/fetch/useFetch';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [wordCards, sendRequest, reset] = useFetch({ result: [] });

  const updateCards = () => {
    if (userId) {
      sendRequest({ url: `http://localhost:5000/api/words/${userId}` });
    }
  };

  const login = useCallback(id => {
    setUserId(id);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    reset([]);
  }, []);

  useEffect(() => {
    updateCards();
  }, [userId]);

  const value = {
    wordCards,
    updateCards,
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

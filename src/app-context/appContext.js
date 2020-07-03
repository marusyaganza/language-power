import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../utils/hooks/fetch/useFetch';
import { wordsUrl } from '../constants/urls';
import { useAuth } from '../utils/hooks/auth-hook';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { userId, token, login, logout } = useAuth();
  const [wordCards, sendRequest, reset] = useFetch({ result: [] });

  const updateCards = () => {
    if (userId && token) {
      const headers = { Authorization: `Bearer ${token}` };
      sendRequest({
        url: wordsUrl,
        requestOptions: { headers }
      });
    }
  };

  useEffect(() => {
    if (!userId) {
      reset([]);
    } else {
      updateCards();
    }
  }, [userId]);

  const value = {
    wordCards,
    updateCards,
    login,
    logout,
    userId,
    token
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node
};

AppProvider.defaultProps = {
  children: null
};

import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpDate, setTokenExpDate] = useState(null);

  const login = useCallback((id, tokenString, expirationDate) => {
    setUserId(id);
    setToken(tokenString);
    const year = new Date().getTime() + 1000 * 60 * 60 * 24 * 365;

    const tokenExpirationDate = expirationDate || new Date(year);
    setTokenExpDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: id,
        token: tokenString,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    // eslint-disable-next-line prettier/prettier
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpDate, logout]);

  return { userId, token, login, logout };
};

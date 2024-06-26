import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  const expirationTime = localStorage.getItem('expirationTime');
  const currentTime = new Date().getTime();

  return token && expirationTime && currentTime < parseInt(expirationTime);
}

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isTokenValid()) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('roles');
      localStorage.removeItem('expirationTime');
      setIsLoggedIn(false);
    }
  }, []);

  const updateLoginStatus = (loggedIn) => {
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('roles');
      localStorage.removeItem('expirationTime');
    }
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, updateLoginStatus }}>
      {children}
    </LoginContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const updateLoginStatus = (loggedIn) => {
    setIsLoggedIn(loggedIn);
    if (!loggedIn) localStorage.removeItem('token');
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, updateLoginStatus }}>
      {children}
    </LoginContext.Provider>
  );
};

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const login = (token) => {
    setAccessToken(token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  };

  const logout = () => {
    setAccessToken(null);
    setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





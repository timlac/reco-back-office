import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
      JSON.parse(localStorage.getItem('isAuthenticated')) || false);

  useEffect(() => {
    // Whenever the authentication state changes, update it in local storage
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (username) => {
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
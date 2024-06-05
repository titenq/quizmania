import { createContext, useState, useEffect, ReactNode, FC } from 'react';

import { IAuthContext } from '../interfaces/IAuthContext';
import { IUserInfo } from '../interfaces/IUserInfo';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  userInfo: null,
  login: () => { },
  logout: () => { },
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      setIsLoggedIn(true);
      const storedUserInfo = localStorage.getItem('user_info');
      
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  const login = (token: string, userInfo: IUserInfo) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_info', JSON.stringify(userInfo));

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');

    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
    { children }
    < /AuthContext.Provider>
  );
};

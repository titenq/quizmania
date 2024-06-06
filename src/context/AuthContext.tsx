import { createContext, useState, useEffect, FC } from 'react';

import Cookies from 'js-cookie';

import { IUser } from '../interfaces/IUser';
import { IAuthContext } from '../interfaces/IAuthContext';
import { IAuthProviderProps } from '../interfaces/IAuthProviderProps';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  userInfo: null,
  login: () => { },
  logout: () => { },
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get('user_info');

    if (userCookie) {
      const parsedUserInfo = JSON.parse(userCookie);

      setIsLoggedIn(true);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  const login = (userInfo: IUser) => {
    Cookies.set('user_info', JSON.stringify(userInfo), { expires: 7, secure: true, sameSite: 'strict' });

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const logout = () => {
    Cookies.remove('user_info', { expires: 7, secure: true, sameSite: 'strict' });

    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

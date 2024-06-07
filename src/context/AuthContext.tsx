import { createContext, useState, useEffect, FC } from 'react';

import Cookies from 'js-cookie';

import { IUser } from '../interfaces/IUser';
import { IAuthContext } from '../interfaces/IAuthContext';
import { IAuthProviderProps } from '../interfaces/IAuthProviderProps';
import getUser from '../helpers/getUser';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  userInfo: null,
  login: () => { },
  logout: () => { }
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const credentialCookie = Cookies.get('credential');

    if (credentialCookie) {
      const parsedCredential = JSON.parse(credentialCookie);
      const user = getUser(parsedCredential);

      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  const login = (credential: string) => {
    Cookies.set('credential', JSON.stringify(credential), { expires: 7, secure: true, sameSite: 'strict' });

    const user = getUser(credential);

    setIsLoggedIn(true);
    setUserInfo(user);
  };

  const logout = () => {
    Cookies.remove('credential', { expires: 7, secure: true, sameSite: 'strict' });

    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

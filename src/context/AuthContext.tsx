import { createContext, useState, useEffect, FC } from 'react';

import { IUser } from '../interfaces/IUser';
import { IAuthContext } from '../interfaces/IAuthContext';
import { IAuthProviderProps } from '../interfaces/IAuthProviderProps';
import getUser from '../helpers/getUser';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  userInfo: null,
  login: () => {},
  logout: () => {},
  loginGithub: () => {}
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(() => {
    const credentialStorage = localStorage.getItem('credential');

    if (credentialStorage) {
      const parsedCredential = JSON.parse(credentialStorage);
      const user = getUser(parsedCredential);

      return user;
    }

    return null;
  });

  useEffect(() => {
    const credentialStorage = localStorage.getItem('credential');

    if (credentialStorage) {
      const parsedCredential = JSON.parse(credentialStorage);
      const user = getUser(parsedCredential);

      setIsLoggedIn(true);
      setUserInfo(user);
    }
  }, []);

  const login = (credential: string) => {
    localStorage.setItem('credential', JSON.stringify(credential));

    const user = getUser(credential);

    setIsLoggedIn(true);
    setUserInfo(user);
  };

  const loginGithub = (userInfo: IUser) => {
    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('credential');

    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout, loginGithub }}>
      {children}
    </AuthContext.Provider>
  );
};

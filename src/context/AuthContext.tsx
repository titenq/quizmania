import { createContext, useState, useEffect, FC } from 'react';

import IUser from '../interfaces/IUser';
import IAuthContext from '../interfaces/IAuthContext';
import IAuthProviderProps from '../interfaces/IAuthProviderProps';
import { backendBaseUrl, frontendBaseUrl } from '../helpers/baseUrl.ts';
import Host from '../enums/Host.ts';
import TokenName from '../enums/TokenName.ts';
import getUser from '../api/getUser.ts';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {}
};

const googleTokenStorage = localStorage.getItem('google_token');
const facebookTokenStorage = localStorage.getItem('facebook_token');
const githubTokenStorage = localStorage.getItem('github_token');
const xTokenStorage = localStorage.getItem('x_token');

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      if (googleTokenStorage) {
        try {
          const user = await getUser(googleTokenStorage, Host.GOOGLE, TokenName.GOOGLE);

          setIsLoggedIn(true);
          setUser(user);
        } catch (error) {
          console.error('Erro no login do Google:', error);

          setIsLoggedIn(false);
          setUser(null);
        }
      }

      if (facebookTokenStorage) {
        try {
          const user = await getUser(facebookTokenStorage, Host.FACEBOOK, TokenName.FACEBOOK);

          setIsLoggedIn(true);
          setUser(user);
        } catch (error) {
          console.error('Erro no login do Facebook:', error);

          setIsLoggedIn(false);
          setUser(null);
        }
      }

      if (githubTokenStorage) {
        try {
          const user = await getUser(githubTokenStorage, Host.GITHUB, TokenName.GITHUB);

          setIsLoggedIn(true);
          setUser(user);
        } catch (error) {
          console.error('Erro no login do GitHub:', error);

          setIsLoggedIn(false);
          setUser(null);
        }
      }

      if (xTokenStorage) {
        try {
          const user = await getUser(xTokenStorage, Host.X, TokenName.X);

          setIsLoggedIn(true);
          setUser(user);
        } catch (error) {
          console.error('Erro no login do X:', error);

          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    initAuth();
  }, []);

  const login = (user: IUser) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    setUser(null);

    const getLogout = async () => {
      try {
        const response = await fetch(`${backendBaseUrl}/logout`, {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          window.location.href = frontendBaseUrl;
        } else {
          console.error('Erro no logout');
        }
      } catch (error) {
        console.error('Erro no logout:', error);
      }
    };

    getLogout();
  };

  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn,
          user,
          login,
          logout,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

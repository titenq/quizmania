import { useState, useEffect, FC } from 'react';

import IUser from '../interfaces/IUser';
import IAuthProviderProps from '../interfaces/IAuthProviderProps';
import { backendBaseUrl, frontendBaseUrl } from '../helpers/baseUrl.ts';
import Host from '../enums/Host.ts';
import TokenName from '../enums/TokenName.ts';
import getUser from '../api/user/getUser.ts';
import AuthContext from './AuthContext';

const googleToken = localStorage.getItem('google_token');
const facebookToken = localStorage.getItem('facebook_token');
const githubToken = localStorage.getItem('github_token');
const xToken = localStorage.getItem('x_token');

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUserInfo = async (token: string, host: Host, tokenName: TokenName) => {
      try {
        const user = await getUser(token, host, tokenName);

        setIsLoggedIn(true);
        setUser(user);
      } catch (error) {
        console.error(`Erro no login do ${host}:`, error);

        setIsLoggedIn(false);
        setUser(null);
      }
    };

    const initAuth = async () => {
      googleToken && getUserInfo(googleToken, Host.GOOGLE, TokenName.GOOGLE);
      facebookToken && getUserInfo(facebookToken, Host.FACEBOOK, TokenName.FACEBOOK);
      githubToken && getUserInfo(githubToken, Host.GITHUB, TokenName.GITHUB);
      xToken && getUserInfo(xToken, Host.X, TokenName.X);
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

        const data = await response.json();

        if (data.message === 'Sucesso ao fazer logout') {
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

export default AuthProvider;

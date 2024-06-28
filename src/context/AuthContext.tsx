import { createContext, useState, useEffect, FC } from 'react';

import { IUser } from '../interfaces/IUser';
import { IAuthContext } from '../interfaces/IAuthContext';
import { IAuthProviderProps } from '../interfaces/IAuthProviderProps';
import { backendBaseUrl, frontendBaseUrl } from '../helpers/baseUrl.ts';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  userInfo: null,
  loginGoogle: () => {},
  loginGithub: () => {},
  loginX: () => {},
  loginFacebook: () => {},
  logout: () => {}
};

const googleTokenStorage = localStorage.getItem('google_token');
const facebookTokenStorage = localStorage.getItem('facebook_token');
const githubTokenStorage = localStorage.getItem('github_token');
const xTokenStorage = localStorage.getItem('x_token');

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const getGoogleUser = async (token: string) => {
      const response = await fetch(`${backendBaseUrl}/google/user`, {
        method: 'POST',
        headers: {
          'google_token': token
        }
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        setUserInfo(null);

        throw new Error('Erro ao buscar informações do usuário no Google');
      }

      const user = await response.json();

      return user;
    };

    const getFacebookUser = async (token: string) => {
      const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`, {
        method: 'POST',
        headers: {
          'facebook_token': token
        }
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        setUserInfo(null);

        throw new Error('Erro ao buscar informações do usuário no Facebook');
      }

      const user = await response.json();

      const userInfo = {
        name: user.name,
        email: user.email,
        picture: `${backendBaseUrl}/uploads/facebook/${user.id}.jpg`
      };

      setIsLoggedIn(true);
      setUserInfo(userInfo);

      return userInfo;
    };

    const getGithubUser = async (token: string) => {
      const response = await fetch(`${backendBaseUrl}/github/user`, {
        method: 'POST',
        headers: {
          'github_token': token
        }
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        setUserInfo(null);

        throw new Error('Erro ao buscar informações do usuário no GitHub');
      }

      const user = await response.json();

      return user;
    };

    const getXUser = async (token: string) => {
      const response = await fetch(`${backendBaseUrl}/x/user`, {
        method: 'POST',
        headers: {
          'facebook_token': token
        }
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        setUserInfo(null);

        throw new Error('Erro ao buscar informações do usuário no X');
      }

      const user = await response.json();

      return user;
    };

    const initAuth = async () => {
      if (googleTokenStorage) {
        try {
          const user = await getGoogleUser(googleTokenStorage);

          setIsLoggedIn(true);
          setUserInfo(user);
        } catch (error) {
          console.error('Erro no login do Google:', error);

          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }

      if (facebookTokenStorage) {
        try {
          const user = await getFacebookUser(facebookTokenStorage);

          setIsLoggedIn(true);
          setUserInfo(user);
        } catch (error) {
          console.error('Erro no login do Facebook:', error);

          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }

      if (githubTokenStorage) {
        try {
          const user = await getGithubUser(githubTokenStorage);

          setIsLoggedIn(true);
          setUserInfo(user);
        } catch (error) {
          console.error('Erro no login do GitHub:', error);

          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }

      if (xTokenStorage) {
        try {
          const user = await getXUser(xTokenStorage);

          setIsLoggedIn(true);
          setUserInfo(user);
        } catch (error) {
          console.error('Erro no login do X:', error);

          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }
    };

    initAuth();
  }, []);

  const loginGoogle = (token: string, userInfo: IUser) => {
    localStorage.setItem('google_token', token);

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const loginFacebook = (token: string, userInfo: IUser) => {
    localStorage.setItem('facebook_token', token);

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const loginGithub = (token: string, userInfo: IUser) => {
    localStorage.setItem('github_token', token);

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const loginX = (token: string, userInfo: IUser) => {
    localStorage.setItem('x_token', token);

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const logout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    setUserInfo(null);

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
          userInfo,
          loginGoogle,
          loginX,
          loginGithub,
          loginFacebook,
          logout,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

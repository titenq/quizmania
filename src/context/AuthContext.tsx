import { createContext, useState, useEffect, FC } from 'react';

import IUser from '../interfaces/IUser';
import IAuthContext from '../interfaces/IAuthContext';
import IAuthProviderProps from '../interfaces/IAuthProviderProps';
import { backendBaseUrl, frontendBaseUrl } from '../helpers/baseUrl.ts';

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
    const getGoogleUser = async (token: string) => {
      const response = await fetch(`${backendBaseUrl}/google/user`, {
        method: 'POST',
        headers: {
          'google_token': token
        }
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        setUser(null);

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
        setUser(null);

        throw new Error('Erro ao buscar informações do usuário no Facebook');
      }

      const user = await response.json();

      const userInfo = {
        name: user.name,
        email: user.email,
        picture: `${backendBaseUrl}/uploads/facebook/${user.id}.jpg`
      };

      setIsLoggedIn(true);
      setUser(userInfo);

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
        setUser(null);

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
        setUser(null);

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
          setUser(user);
        } catch (error) {
          console.error('Erro no login do Google:', error);

          setIsLoggedIn(false);
          setUser(null);
        }
      }

      if (facebookTokenStorage) {
        try {
          const user = await getFacebookUser(facebookTokenStorage);

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
          const user = await getGithubUser(githubTokenStorage);

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
          const user = await getXUser(xTokenStorage);

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

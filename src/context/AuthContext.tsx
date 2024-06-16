import { createContext, useState, useEffect, FC } from 'react';
import { useLocation } from 'react-router-dom';

import { IUser } from '../interfaces/IUser';
import { IAuthContext } from '../interfaces/IAuthContext';
import { IAuthProviderProps } from '../interfaces/IAuthProviderProps';
import getUser from '../helpers/getUser';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  userInfo: null,
  loginGoogle: () => {},
  loginGithub: () => {},
  loginFacebook: () => {},
  logout: () => {}
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const googleTokenStorage = localStorage.getItem('google_token');
    const facebookTokenStorage = localStorage.getItem('facebook_token');
    const githubTokenStorage = localStorage.getItem('github_token');

    if (googleTokenStorage) {
      const user = getUser(googleTokenStorage);

      setIsLoggedIn(true);
      setUserInfo(user);
    }

    if (facebookTokenStorage) {
      try {
        const getFacebookUser = async () => {
          const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${facebookTokenStorage}`);

          if (!response.ok) {
            setIsLoggedIn(false);
            setUserInfo(null);

            throw new Error('Failed to fetch user info');
          }

          const user = await response.json();

          setIsLoggedIn(true);
          setUserInfo(user);
        };

        getFacebookUser();
      } catch (error) {
        console.error('Error during GitHub login:', error);

        setIsLoggedIn(false);
        setUserInfo(null);
      }
    }

    if (githubTokenStorage) {
      try {
        const getGithubUser = async () => {
          const response = await fetch(`http://localhost:4000/auth/github/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${githubTokenStorage}`
            }
          });

          if (!response.ok) {
            setIsLoggedIn(false);
            setUserInfo(null);

            throw new Error('Failed to fetch user info');
          }

          const user = await response.json();

          setIsLoggedIn(true);
          setUserInfo(user);
        };

        getGithubUser();
      } catch (error) {
        console.error('Error during GitHub login:', error);

        setIsLoggedIn(false);
        setUserInfo(null);
      }
    }
  }, []);

  const loginGoogle = (token: string) => {
    localStorage.setItem('google_token', token);

    const user = getUser(token);

    setIsLoggedIn(true);
    setUserInfo(user);
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

  const logout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    setUserInfo(null);
  };

  useEffect(() => {
    const autoLogin = async () => {
      const googleToken = window.localStorage.getItem('google_token');
      const facebookToken = window.localStorage.getItem('facebook_token');
      const githubToken = window.localStorage.getItem('github_token');

      if (!googleToken && !facebookToken && !githubToken ) {
        logout();
      }

      if (googleToken) {
        loginGoogle(googleToken);
      }

      if (facebookToken && userInfo) {
        loginFacebook(facebookToken, userInfo);
      }

      if (githubToken && userInfo) {
        loginGithub(githubToken, userInfo!);
      }
    };

    autoLogin();
  }, [location, userInfo]);

  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn,
          userInfo,
          loginGoogle,
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

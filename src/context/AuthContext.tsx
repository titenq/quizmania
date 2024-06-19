import { createContext, useState, useEffect, FC } from 'react';

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const googleTokenStorage = localStorage.getItem('google_token');
    const facebookTokenStorage = localStorage.getItem('facebook_token');
    const githubTokenStorage = localStorage.getItem('github_token');

    const getFacebookUser = async (token: string) => {
      const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);

      if (!response.ok) {
        setIsLoggedIn(false);
        setUserInfo(null);

        throw new Error('Failed to fetch Facebook user info');
      }

      const user = await response.json();

      return user;
    };

    const getGithubUser = async (token: string) => {
      const response = await fetch(`http://localhost:4000/github/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        setIsLoggedIn(false);
        setUserInfo(null);

        throw new Error('Failed to fetch Github user info');
      }

      const user = await response.json();

      return user;
    };

    const initAuth = async () => {
      if (googleTokenStorage) {
        const user = getUser(googleTokenStorage);

        setIsLoggedIn(true);
        setUserInfo(user);
      }

      if (facebookTokenStorage) {
        try {
          const user = await getFacebookUser(facebookTokenStorage);

          setIsLoggedIn(true);
          setUserInfo(user);
        } catch (error) {
          console.error('Error during Facebook login:', error);

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
          console.error('Error during GitHub login:', error);

          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }
    };

    initAuth();
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

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
  loginGithub: () => {},
  loginFacebook: () => {}
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const credentialStorage = localStorage.getItem('credential');
    const githubTokenStorage = localStorage.getItem('github_token');
    const facebookTokenStorage = localStorage.getItem('facebook_token');

    if (credentialStorage) {
      const user = getUser(credentialStorage);

      setIsLoggedIn(true);
      setUserInfo(user);
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
  }, []);

  const login = (credential: string) => {
    localStorage.setItem('credential', credential);

    const user = getUser(credential);

    setIsLoggedIn(true);
    setUserInfo(user);
  };

  const loginGithub = (token: string, userInfo: IUser) => {
    localStorage.setItem('github_token', token);

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const loginFacebook = (token: string, userInfo: IUser) => {
    localStorage.setItem('facebook_token', token);

    setIsLoggedIn(true);
    setUserInfo(userInfo);
  };

  const logout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout, loginGithub, loginFacebook }}>
      {children}
    </AuthContext.Provider>
  );
};

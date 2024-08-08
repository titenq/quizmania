import { createContext } from 'react';
import IAuthContext from '../interfaces/IAuthContext';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  user: null,
  login: () => { },
  logout: () => { }
};

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export default AuthContext;

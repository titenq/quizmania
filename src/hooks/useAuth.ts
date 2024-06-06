import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { IAuthContext } from '../interfaces/IAuthContext';

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { IProtectedRouteProps } from '../interfaces/IProtectedRouteProps';

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;

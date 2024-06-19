import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import GoogleLogin from './pages/GoogleLogin';
import FacebookLogin from './pages/FacebookLogin';
import GithubLogin from './pages/GithubLogin';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/auth/google/callback',
        element: <GoogleLogin />
      },
      {
        path: '/auth/facebook/callback',
        element: <FacebookLogin />
      },
      {
        path: '/auth/github/callback',
        element: <GithubLogin />
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;

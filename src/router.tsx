import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import GoogleLogin from './pages/GoogleLogin';
import FacebookLogin from './pages/FacebookLogin';
import XLogin from './pages/XLogin';
import GithubLogin from './pages/GithubLogin';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';

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
        path: '/auth/x/callback',
        element: <XLogin />
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
        path: '/quiz',
        element: (
          <ProtectedRoute>
            <Quiz />
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

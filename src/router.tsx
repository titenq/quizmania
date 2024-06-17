import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import GithubLogin from './pages/GithubLogin';
import FacebookLogin from './pages/FacebookLogin';
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
        path: '/auth/github/callback',
        element: <GithubLogin />
      },
      {
        path: '/auth/facebook/callback',
        element: <FacebookLogin />
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

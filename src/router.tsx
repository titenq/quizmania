import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
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
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;

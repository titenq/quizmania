/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const GoogleLogin = lazy(() => import('./pages/GoogleLogin'));
const FacebookLogin = lazy(() => import('./pages/FacebookLogin'));
const XLogin = lazy(() => import('./pages/XLogin'));
const GithubLogin = lazy(() => import('./pages/GithubLogin'));
const Quiz = lazy(() => import('./pages/Quiz'));
const QuizQuestion = lazy(() => import('./pages/QuizQuestion'));
const QuizAnswers = lazy(() => import('./pages/QuizAnswers'));
const QuizAnswersResponse = lazy(() => import('./pages/QuizAnswersResponse'));
const Quizzes = lazy(() => import('./pages/Quizzes'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <Login />
          </Suspense>
        ) 
      },
      {
        path: '/auth/google/callback',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <GoogleLogin />
          </Suspense>
        ) 
      },
      {
        path: '/auth/facebook/callback',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <FacebookLogin />
          </Suspense>
        ) 
      },
      {
        path: '/auth/x/callback',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <XLogin />
          </Suspense>
        ) 
      },
      {
        path: '/auth/github/callback',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <GithubLogin />
          </Suspense>
        )
      },
      {
        path: '/admin',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: '/quiz',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: '/quiz/:quizId',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <QuizQuestion />
          </Suspense>
        )
      },
      {
        path: '/quiz/:quizId/answers',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <ProtectedRoute>
              <QuizAnswers />
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: '/quiz/:quizId/answers/response',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <QuizAnswersResponse />
          </Suspense>
        )
      },
      {
        path: '/quizzes',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <Quizzes />
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;

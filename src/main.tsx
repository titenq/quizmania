import React from 'react';
import ReactDOM from 'react-dom/client';

import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.tsx';
import './index.css';

const clientId = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

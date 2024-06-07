import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';

import styles from './Login.module.css';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          const credential = credentialResponse.credential;
          credential && login(credential);

          return navigate('/dashboard');
        }}
        onError={() => {
          logout();

          return navigate('/');
        }}
      />
    </div>
  );
};

export default Login;

import { useNavigate } from 'react-router-dom';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import styles from './Login.module.css';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoogleOnSuccess = (credentialResponse: CredentialResponse) => {
    const credential = credentialResponse.credential;
    credential && login(credential);

    return navigate('/dashboard');
  };

  const handleGoogleOnError = () => {
    logout();

    return navigate('/');
  };

  return (
    <div className={styles.container}>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={handleGoogleOnError}
      />
    </div>
  );
};

export default Login;

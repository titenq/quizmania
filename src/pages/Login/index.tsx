import { useNavigate } from 'react-router-dom';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { FaGithub } from 'react-icons/fa';

import styles from './Login.module.css';
import { useAuth } from '../../hooks/useAuth';

const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

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

  const handleGithubLogin = () => {
    const redirectUri = 'http://localhost:4000/auth/github/callback';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubAuthUrl;
  };

  return (
    <div className={styles.container}>
      <GoogleLogin
        onSuccess={handleGoogleOnSuccess}
        onError={handleGoogleOnError}
      />

      <button onClick={handleGithubLogin} className={styles.githubButton}>
        Login com GitHub <FaGithub size={22} className={styles.githubIcon} />
      </button>
    </div>
  );
};

export default Login;

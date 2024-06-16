import { useNavigate } from 'react-router-dom';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { FaFacebook, FaGithub } from 'react-icons/fa';

import styles from './Login.module.css';
import { useAuth } from '../../hooks/useAuth';

const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

const Login = () => {
  const { loginGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    const credential = credentialResponse.credential;
    credential && loginGoogle(credential);

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

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:4000/auth/facebook';
  };

  return (
    <div className={styles.container}>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleOnError}
      />

      <button
        onClick={handleFacebookLogin}
        className={`${styles.loginButton} ${styles.facebookButton}`}
      >
        Login com Facebook <FaFacebook size={22} className={styles.loginIcon} />
      </button>

      <button
        onClick={handleGithubLogin}
        className={`${styles.loginButton} ${styles.githubButton}`}
      >
        Login com GitHub <FaGithub size={22} className={styles.loginIcon} />
      </button>
    </div>
  );
};

export default Login;

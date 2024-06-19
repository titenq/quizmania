// import { useNavigate } from 'react-router-dom';

// import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

import styles from './Login.module.css';
// import { useAuth } from '../../hooks/useAuth';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

const Login = () => {
  /* const { loginGoogle, logout } = useAuth();
  const navigate = useNavigate(); */

  /* const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    const credential = credentialResponse.credential;
    credential && loginGoogle(credential);

    return navigate('/admin');
  }; */

  const handleGoogleLogin = () => {
    const redirectUri = 'http://localhost:4000/google/callback';

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email`;

    window.location.href = googleAuthUrl;
  };

  /* const handleGoogleOnError = () => {
    logout();

    return navigate('/');
  }; */

  const handleGithubLogin = () => {
    const redirectUri = 'http://localhost:4000/github/callback';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubAuthUrl;
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:4000/facebook';
  };

  return (
    <div className={styles.container}>
      {/* <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleOnError}
      /> */}

      <button
        onClick={handleGoogleLogin}
        className={`${styles.loginButton} ${styles.googleButton}`}
      >
        Login com Google <FaGoogle size={22} className={styles.loginIcon} />
      </button>

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

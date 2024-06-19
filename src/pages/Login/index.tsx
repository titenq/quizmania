import Lottie from 'lottie-react';

import styles from './Login.module.css';
import lottieGoogle from '../../assets/lotties/google.json';
import lottieFacebook from '../../assets/lotties/facebook.json';
import lottieGithub from '../../assets/lotties/github.json';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

const Login = () => {
  const handleGoogleLogin = () => {
    const redirectUri = 'http://localhost:4000/google/callback';

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email`;

    window.location.href = googleAuthUrl;
  };

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
      <button
        onClick={handleGoogleLogin}
        className={`${styles.loginButton} ${styles.googleButton}`}
      >
        <span className={styles.loginTitle}>Login com Google</span> <Lottie animationData={lottieGoogle} className={styles.lottieGoogle} />
      </button>

      <button
        onClick={handleFacebookLogin}
        className={`${styles.loginButton} ${styles.facebookButton}`}
      >
        <span className={styles.loginTitle}>Login com Facebook</span> <Lottie animationData={lottieFacebook} className={styles.lottieFacebook} />
      </button>

      <button
        onClick={handleGithubLogin}
        className={`${styles.loginButton} ${styles.githubButton}`}
      >
        <span className={styles.loginTitle}>Login com GitHub</span> <Lottie animationData={lottieGithub} className={styles.lottieGithub} />
      </button>
    </div>
  );
};

export default Login;

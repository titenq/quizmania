import Lottie from 'lottie-react';

import styles from './Login.module.css';
import lottieGoogle from '../../assets/lotties/google.json';
import lottieFacebook from '../../assets/lotties/facebook.json';
import lottieX from '../../assets/lotties/x.json';
import lottieGithub from '../../assets/lotties/github.json';
import { backendBaseUrl } from '../../helpers/baseUrl';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${backendBaseUrl}/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${backendBaseUrl}/facebook`;
  };

  const handleXLogin = async () => {
    window.location.href = `${backendBaseUrl}/x`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${backendBaseUrl}/github`;
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleGoogleLogin}
        className={`${styles.loginButton} ${styles.googleButton}`}
      >
        <span className={styles.loginTitle}>Login com Google</span>
        <Lottie animationData={lottieGoogle} className={styles.lottieGoogle} />
      </button>

      <button
        onClick={handleXLogin}
        className={`${styles.loginButton} ${styles.xButton}`}
      >
        <span className={styles.loginTitle}>Login com X</span>
        <Lottie animationData={lottieX} className={styles.lottieX} />
      </button>

      <button
        onClick={handleFacebookLogin}
        className={`${styles.loginButton} ${styles.facebookButton}`}
      >
        <span className={styles.loginTitle}>Login com Facebook</span>
        <Lottie animationData={lottieFacebook} className={styles.lottieFacebook} />
      </button>

      <button
        onClick={handleGithubLogin}
        className={`${styles.loginButton} ${styles.githubButton}`}
      >
        <span className={styles.loginTitle}>Login com GitHub</span>
        <Lottie animationData={lottieGithub} className={styles.lottieGithub} />
      </button>
    </div>
  );
};

export default Login;

import Lottie from 'lottie-react';

import styles from './Login.module.css';
import lottieGoogle from '../../assets/lotties/google.json';
import lottieFacebook from '../../assets/lotties/facebook.json';
import lottieX from '../../assets/lotties/x.json';
import lottieGithub from '../../assets/lotties/github.json';
import { backendBaseUrl } from '../../helpers/baseUrl';
import Host from '../../enums/Host';

const Login = () => {
  const handleLogin = (host: Host) => {
    window.location.href = `${backendBaseUrl}/${host}`;
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleLogin(Host.GOOGLE)}
        className={`${styles.loginButton} ${styles.googleButton}`}
      >
        <span className={styles.loginTitle}>Login com Google</span>
        <Lottie animationData={lottieGoogle} className={styles.lottieGoogle} />
      </button>

      <button
        onClick={() => handleLogin(Host.X)}
        className={`${styles.loginButton} ${styles.xButton}`}
      >
        <span className={styles.loginTitle}>Login com X</span>
        <Lottie animationData={lottieX} className={styles.lottieX} />
      </button>

      <button
        onClick={() => handleLogin(Host.FACEBOOK)}
        className={`${styles.loginButton} ${styles.facebookButton}`}
      >
        <span className={styles.loginTitle}>Login com Facebook</span>
        <Lottie animationData={lottieFacebook} className={styles.lottieFacebook} />
      </button>

      <button
        onClick={() => handleLogin(Host.GITHUB)}
        className={`${styles.loginButton} ${styles.githubButton}`}
      >
        <span className={styles.loginTitle}>Login com GitHub</span>
        <Lottie animationData={lottieGithub} className={styles.lottieGithub} />
      </button>
    </div>
  );
};

export default Login;

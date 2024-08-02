import styles from './Login.module.css';
import lottieGoogle from '../../assets/lotties/google.json';
import lottieFacebook from '../../assets/lotties/facebook.json';
import lottieX from '../../assets/lotties/x.json';
import lottieGithub from '../../assets/lotties/github.json';
import { backendBaseUrl } from '../../helpers/baseUrl';
import Host from '../../enums/Host';
import ButtonLogin from '../../components/ButtonLogin';

const Login = () => {
  const handleLogin = (host: Host) => {
    window.location.href = `${backendBaseUrl}/${host}`;
  };

  return (
    <div className={styles.container}>
      <ButtonLogin
        title='Login com Google'
        handleLogin={handleLogin}
        host={Host.GOOGLE}
        lottie={lottieGoogle}
      />

      <ButtonLogin
        title='Login com X'
        handleLogin={handleLogin}
        host={Host.X}
        lottie={lottieX}
      />

      <ButtonLogin
        title='Login com Facebook'
        handleLogin={handleLogin}
        host={Host.FACEBOOK}
        lottie={lottieFacebook}
      />

      <ButtonLogin
        title='Login com GitHub'
        handleLogin={handleLogin}
        host={Host.GITHUB}
        lottie={lottieGithub}
      />
    </div>
  );
};

export default Login;

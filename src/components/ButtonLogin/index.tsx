import Lottie, { LottieComponentProps } from 'lottie-react';

import styles from './ButtonLogin.module.css';
import Host from '../../enums/Host';

type ButtonLoginProps = {
  title: string;
  handleLogin: (host: Host) => void;
  host: Host
  lottie: LottieComponentProps['animationData'];
};

const ButtonLogin = (props: ButtonLoginProps) => {
  const style: { [key in Host]: { buttonStyle: string; lottieStyle: string } } = {
    [Host.GOOGLE]: { buttonStyle: 'google_button', lottieStyle: 'lottie_google' },
    [Host.FACEBOOK]: { buttonStyle: 'facebook_button', lottieStyle: 'lottie_facebook' },
    [Host.GITHUB]: { buttonStyle: 'github_button', lottieStyle: 'lottie_github' },
    [Host.X]: { buttonStyle: 'x_button', lottieStyle: 'lottie_x' }
  };

  const { buttonStyle, lottieStyle } = style[props.host];
  
  return (
    <button
      type='button'
      onClick={() => props.handleLogin(props.host)}
      className={`${styles.login_button} ${styles[buttonStyle]}`}
    >
      <span className={styles.login_title}>{props.title}</span>
      <Lottie animationData={props.lottie} className={styles[lottieStyle]} />
    </button>
  );
};

export default ButtonLogin;

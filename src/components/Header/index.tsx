import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';

const Header = () => {
  return (
    <div className={styles.container}>
      <Lottie animationData={lottieQuiz} loop={false} className={styles.lottieQuiz} />
    </div>
  );
};

export default Header;

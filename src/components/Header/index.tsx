import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Lottie animationData={lottieQuiz} loop={false} className={styles.lottieQuiz} />
        <a href='/' className={styles.link}>QuizMania</a>
      </div>

      <a href='/login' className={styles.link}>Login</a>
    </div>
  );
};

export default Header;

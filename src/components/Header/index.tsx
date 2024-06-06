import { useNavigate } from 'react-router-dom';

import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isLoggedIn, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    return navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Lottie animationData={lottieQuiz} loop={false} className={styles.lottieQuiz} />
        <a href='/' className={styles.link}>QuizMania</a>
      </div>

      {!isLoggedIn ? (
        <a href='/login' className={styles.link}>Login</a>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <img src={userInfo?.picture} alt="avatar" />
        </div>
    )}
    </div>
  );
};

export default Header;

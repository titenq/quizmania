import { Link, useNavigate } from 'react-router-dom';

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
        <Link to='/login' className={styles.link}>Login</Link>
      ) : (
        <div className={styles.avatarContainer}>
            <button onClick={handleLogout} className={styles.buttonLogout}>Logout</button>
            <Link to='/dashboard'>
              <img src={userInfo?.picture} alt="avatar" className={styles.avatar} />
            </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

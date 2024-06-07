import { Link, useLocation, useNavigate } from 'react-router-dom';

import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const Header = () => {
  const { isLoggedIn, userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
  }, [location])

  const handleLogout = () => {
    logout();

    return navigate('/');
  };

  return (
    <div
      className={`${styles.container} ${location.pathname === '/' ? styles.animationToHeader : ''}`}
    >
      <div className={styles.logoContainer}>
        <Lottie
          animationData={lottieQuiz}
          loop={false}
          className={`${styles.lottieQuiz} ${location.pathname === '/' ? styles.animationToLogo : ''}`}
        />
        <a
          href='/'
          className={`${styles.link} ${location.pathname === '/' ? styles.animationToTitle : ''}`}>
          QuizMania
        </a>
      </div>

      {!isLoggedIn ? (
        <Link
          to='/login'
          className={`${styles.link} ${location.pathname === '/' ? styles.animationToTitle : ''}`}
        >
          Login
        </Link>
      ) : (
          <div className={`${styles.avatarContainer} ${location.pathname === '/' ? styles.animationToTitle : ''}`}>
          <button
            onClick={handleLogout}
            className={styles.buttonLogout}
          >
            Logout
          </button>
          <Link
            to='/dashboard'
            className={`${styles.link} ${location.pathname === '/' ? styles.animationToTitle : ''}`}
          >
            <img src={userInfo?.picture} alt="avatar" className={styles.avatar} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

import { Link, useLocation, useNavigate } from 'react-router-dom';

import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';
import avatar from '../../assets/avatar.png';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

const Header = () => {
  const { isLoggedIn, userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [avatarSrc, setAvatarSrc] = useState('');

  useEffect(() => {
    userInfo && setAvatarSrc(userInfo?.picture);
  }, [userInfo]);

  const handleLogout = () => {
    logout();

    return navigate('/');
  };

  const handleAvatarError = () => {
    setAvatarSrc(avatar);
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
            <img
              src={avatarSrc}
              alt="avatar"
              className={styles.avatar}
              onError={handleAvatarError}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';
import avatar from '../../assets/avatar.png';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isLoggedIn, userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState('');
  const [shouldAnimate, setShouldAnimate] = useState<string | boolean>(false);

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

  useLayoutEffect(() => {
    const hasAnimated = localStorage.getItem('hasAnimated');

    if (!hasAnimated) {
      setShouldAnimate('true');
      localStorage.setItem('hasAnimated', 'true');
    }
  }, []);

  return (
    <div className={`${styles.container} ${shouldAnimate ? styles.animationToHeader : styles.container}`}>
      <div className={styles.logoContainer}>
        <Lottie
          animationData={lottieQuiz}
          loop={false}
          className={`${styles.lottieQuiz} ${shouldAnimate ? styles.animationToLogo : styles.lottieQuiz}`}
        />
        <a
          href='/'
          className={`${styles.link} ${shouldAnimate ? styles.animationToTitle : styles.link}`}>
          QuizMania
        </a>
      </div>

      {!isLoggedIn ? (
        <Link
          to='/login'
          className={`${styles.link} ${shouldAnimate ? styles.animationToTitle : styles.link}`}
        >
          Login
        </Link>
      ) : (
          <div className={`${styles.avatarContainer} ${shouldAnimate ? styles.animationToTitle : styles.avatarContainer}`}>
          <button
            onClick={handleLogout}
            className={styles.buttonLogout}
          >
            Logout
          </button>
          <Link
            to='/dashboard'
              className={`${styles.link} ${shouldAnimate ? styles.animationToTitle : styles.link}`}
          >
            <img
              src={avatarSrc === '' ? avatar : avatarSrc}
              alt="avatar"
              className={styles.avatar}
              onError={handleAvatarError}
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

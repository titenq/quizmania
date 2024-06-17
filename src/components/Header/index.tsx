import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';
import avatar from '../../assets/avatar.png';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, userInfo, logout } = useAuth();
  const [shouldAnimate, setShouldAnimate] = useState<string | null>(null);
  const [loginAvatar, setLoginAvatar] = useState<string>(avatar);

  useEffect(() => {
    const hasAnimated = localStorage.getItem('hasAnimated');

    if (!hasAnimated) {
      setShouldAnimate('true');
      localStorage.setItem('hasAnimated', 'true');
    }
  }, [location]);

  useEffect(() => {
    const facebookPicture = localStorage.getItem('facebook_picture');

    if (facebookPicture) {
      setLoginAvatar(facebookPicture);

      return;
    }

    userInfo?.picture && setLoginAvatar(userInfo?.picture);
  }, [userInfo?.picture]);

  const handleLogout = () => {
    logout();

    return navigate('/');
  };

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
              src={loginAvatar}
              alt="avatar"
              className={styles.avatar}
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [shouldAnimate, setShouldAnimate] = useState<string | null>(null);

  useEffect(() => {
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
        <div
          className={`${styles.avatarContainer} ${shouldAnimate ? styles.animationToTitle : styles.avatarContainer}`}
        >
          <Link
            to='/admin'
            className={`${styles.adminLink} ${shouldAnimate ? styles.animationToTitle : styles.adminLink}`}
          >
            Admin
          </Link>
          <button
            onClick={() => logout()}
            className={styles.buttonLogout}
          >
            Logout
          </button>
          <img
            src={user?.picture || avatar}
            alt="avatar"
            className={styles.avatar}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        </div>
      )}
    </div>
  );
};

export default Header;

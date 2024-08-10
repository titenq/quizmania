import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Lottie from 'lottie-react';

import styles from './Header.module.css';
import lottieQuiz from '../../assets/lotties/quiz.json';
import avatar from '../../assets/avatar.png';
import AuthContext from '../../context/AuthContext';

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
    <div className={`${styles.container_header} ${shouldAnimate ? styles.animation_to_header : styles.container_header}`}>
      <div className={styles.logo_container}>
        <Lottie
          animationData={lottieQuiz}
          loop={false}
          className={`${styles.lottieQuiz} ${shouldAnimate ? styles.animation_to_logo : styles.lottie_quiz}`}
        />
        <a
          href='/'
          className={`${styles.link} ${shouldAnimate ? styles.animation_to_title : styles.link}`}>
          QuizMania
        </a>
      </div>

      {!isLoggedIn ? (
        <Link
          to='/login'
          className={`${styles.link} ${shouldAnimate ? styles.animation_to_title : styles.link}`}
        >
          Login
        </Link>
      ) : (
        <div
          className={`${styles.avatar_container} ${shouldAnimate ? styles.animation_to_title : styles.avatar_container}`}
        >
          <Link
            to='/admin'
            className={`${styles.admin_link} ${shouldAnimate ? styles.animation_to_title : styles.admin_link}`}
          >
            Admin
          </Link>
          <button
            onClick={() => logout()}
            className={styles.button_logout}
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

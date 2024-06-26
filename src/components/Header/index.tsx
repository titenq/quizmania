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

  const handleLogout = async () => {
    const facebookToken = localStorage.getItem('facebook_token');

    /* if (facebookToken) {
      const redirectUrl = encodeURIComponent('http://localhost:4000/facebook/logout');
      
      window.location.href = `https://www.facebook.com/logout.php?next=${redirectUrl}&access_token=${facebookToken}`;
    } */

    if (facebookToken) {
      const facebookLogout = async () => {
        try {
          const response = await fetch('http://localhost:4000/facebook/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
              facebook_token: facebookToken
            }
          });

          if (response.ok) {
            window.location.href = 'http://localhost:5173/';
          } else {
            console.error('Failed to logout');
          }
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
      
      facebookLogout();
    }

    logout();

    navigate('/');
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
            onClick={handleLogout}
            className={styles.buttonLogout}
          >
            Logout
          </button>
          <img
            src={loginAvatar}
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

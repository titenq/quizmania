import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './FacebookLogin.module.css';
import { useAuth } from '../../hooks/useAuth';
import { IUser } from '../../interfaces/IUser';

const FacebookLogin = () => {
  const { loginFacebook } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleFacebookOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`http://localhost:4000/auth/facebook/user`, {
          method: 'GET',
          headers: {
            'facebook_token': token
          }
        });

        const data = response.json();

        console.log(data);
        /* const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const user = await response.json();

        const userInfo: IUser = {
          name: user.name,
          email: user.email,
          picture: ''
        };

        localStorage.setItem('facebook_token', token);
        
        loginFacebook(token, userInfo);
        navigate('/dashboard'); */
      } catch (error) {
        console.error('Error during Facebook login:', error);
        navigate('/login?error=fetch_user_failed');
      }
    };

    if (token) {
      handleFacebookOnSuccess(token);
    }
  }, [token, loginFacebook, navigate]);

  return (
    <div className={styles.container}>
      <p>Logado no Facebook com sucesso!</p>
    </div>
  );
};

export default FacebookLogin;

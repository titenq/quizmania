import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './GoogleLogin.module.css';
import { useAuth } from '../../hooks/useAuth';

const GoogleLogin = () => {
  const { loginGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleGoogleOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`http://localhost:4000/google/user`, {
          method: 'GET',
          headers: {
            'google_token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();

        localStorage.setItem('google_token', token);
        
        loginGoogle(token, userInfo);
        navigate('/admin');
      } catch (error) {
        console.error('Error during Google login:', error);
        navigate('/login?error=fetch_user_failed');
      }
    };

    if (token) {
      handleGoogleOnSuccess(token);
    }
  }, [token, loginGoogle, navigate]);

  return (
    <div className={styles.container}>
      <p>Logado no Google com sucesso!</p>
    </div>
  );
};

export default GoogleLogin;

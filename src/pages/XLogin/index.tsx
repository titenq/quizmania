import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './XLogin.module.css';
import { useAuth } from '../../hooks/useAuth';

const XLogin = () => {
  const { loginX } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleXOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`http://localhost:4000/x/user`, {
          method: 'GET',
          headers: {
            x_token: token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();

        localStorage.setItem('x_token', token);
        
        loginX(token, userInfo);
        navigate('/admin');
      } catch (error) {
        console.error('Error during X login:', error);
        navigate('/login?error=fetch_user_failed');
      }
    };

    if (token) {
      handleXOnSuccess(token);
    }
  }, [token, loginX, navigate]);

  return (
    <div className={styles.container}>
      <p>Logado no X com sucesso!</p>
    </div>
  );
};

export default XLogin;

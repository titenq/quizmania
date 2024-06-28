import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './GoogleLogin.module.css';
import { useAuth } from '../../hooks/useAuth';
import { backendBaseUrl } from '../../helpers/baseUrl';

const GoogleLogin = () => {
  const { loginGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleGoogleOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`${backendBaseUrl}/google/user`, {
          method: 'POST',
          headers: {
            'google_token': token
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar informações do usuário no Google');
        }

        const userInfo = await response.json();

        localStorage.setItem('google_token', token);
        
        loginGoogle(token, userInfo);
        navigate('/admin');
      } catch (error) {
        console.error('Erro ao fazer login no Google:', error);
        navigate('/login?error=google');
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

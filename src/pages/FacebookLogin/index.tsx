import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './FacebookLogin.module.css';
import { useAuth } from '../../hooks/useAuth';
import { backendBaseUrl } from '../../helpers/baseUrl';

const FacebookLogin = () => {
  const { loginFacebook } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleFacebookOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`${backendBaseUrl}/facebook/user`, {
          method: 'POST',
          headers: {
            'facebook_token': token
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar informações do usuário no Facebook');
        }

        const user = await response.json();

        localStorage.setItem('facebook_token', token);
        localStorage.setItem('facebook_picture', user?.picture);
        
        loginFacebook(token, user);
        navigate('/admin');
      } catch (error) {
        console.error('Erro ao fazer login no Facebook:', error);

        navigate('/login?error=facebook');
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

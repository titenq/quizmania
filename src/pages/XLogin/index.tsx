import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './XLogin.module.css';
import { useAuth } from '../../hooks/useAuth';
import { backendBaseUrl } from '../../helpers/baseUrl';

const XLogin = () => {
  const { loginX } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleXOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`${backendBaseUrl}/x/user`, {
          method: 'POST',
          headers: {
            'x_token': token,
            'Access-Control-Allow-Origin': backendBaseUrl
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar informações do usuário no X');
        }

        const userInfo = await response.json();

        localStorage.setItem('x_token', token);
        
        loginX(token, userInfo);
        navigate('/admin');
      } catch (error) {
        console.error('Erro ao fazer login no X:', error);
        navigate('/login?error=x');
      }
    };

    token && handleXOnSuccess(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={styles.container}>
      <p>Logado no X com sucesso!</p>
    </div>
  );
};

export default XLogin;

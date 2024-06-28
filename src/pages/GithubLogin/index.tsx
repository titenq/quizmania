import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './GithubLogin.module.css';
import { useAuth } from '../../hooks/useAuth';
import { backendBaseUrl } from '../../helpers/baseUrl';

const GithubLogin = () => {
  const { loginGithub } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleGithubOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`${backendBaseUrl}/github/user`, {
          method: 'POST',
          headers: {
            github_token: token
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar informações do usuário no GitHub');
        }

        const userInfo = await response.json();

        localStorage.setItem('github_token', token);
        
        loginGithub(token, userInfo);
        navigate('/admin');
      } catch (error) {
        console.error('Erro ao fazer login no GitHub:', error);
        navigate('/login?error=github');
      }
    };

    if (token) {
      handleGithubOnSuccess(token);
    }
  }, [token, loginGithub, navigate]);

  return (
    <div className={styles.container}>
      <p>Logado no GitHub com sucesso!</p>
    </div>
  );
};

export default GithubLogin;

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './GithubLogin.module.css';
import { useAuth } from '../../hooks/useAuth';

const GithubLogin = () => {
  const { loginGithub } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    const handleGithubOnSuccess = async (token: string) => {
      try {
        const response = await fetch(`http://localhost:4000/auth/github/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();

        localStorage.setItem('github_token', token);
        
        loginGithub(token, userInfo);
        navigate('/admin');
      } catch (error) {
        console.error('Error during GitHub login:', error);
        navigate('/login?error=fetch_user_failed');
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

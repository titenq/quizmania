import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './GithubLogin.module.css';
import AuthContext from '../../context/AuthContext';
import getUser from '../../api/getUser';
import Host from '../../enums/Host';
import TokenName from '../../enums/TokenName';

const GithubLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const getUserGithub = async (token: string) => {
      const user = await getUser(token, Host.GITHUB, TokenName.GITHUB);

      if (!user) {
        navigate(`/login?error=${Host.GITHUB}`);
      }

      localStorage.setItem(TokenName.GITHUB, token);

      login(user);
      navigate('/admin');
    };

    token && getUserGithub(token);
  }, [login, navigate, token]);

  return (
    <div className={styles.container}>
      <p>Logado no GitHub com sucesso!</p>
    </div>
  );
};

export default GithubLogin;

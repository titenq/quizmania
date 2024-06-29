import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './XLogin.module.css';
import { AuthContext } from '../../context/AuthContext';
import getUser from '../../api/getUser';
import Host from '../../enums/Host';
import TokenName from '../../enums/TokenName';

const XLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const getUserX = async (token: string) => {
      const user = await getUser(token, Host.X, TokenName.X);

      if (!user) {
        navigate(`/login?error=${Host.X}`);
      }

      localStorage.setItem(TokenName.X, token);

      login(user);
      navigate('/admin');
    };

    token && getUserX(token);
  }, [login, navigate, token]);

  return (
    <div className={styles.container}>
      <p>Logado no X com sucesso!</p>
    </div>
  );
};

export default XLogin;

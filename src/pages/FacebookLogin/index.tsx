import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './FacebookLogin.module.css';
import AuthContext from '../../context/AuthContext';
import getUser from '../../api/user/getUser';
import Host from '../../enums/Host';
import TokenName from '../../enums/TokenName';

const FacebookLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const getUserFacebook = async (token: string) => {
      const user = await getUser(token, Host.FACEBOOK, TokenName.FACEBOOK);

      if (!user) {
        navigate(`/login?error=${Host.FACEBOOK}`);
      }

      localStorage.setItem(TokenName.FACEBOOK, token);

      login(user);
      navigate('/admin');
    };

    token && getUserFacebook(token);
  }, [login, navigate, token]);

  return (
    <div className={styles.container}>
      <p>Logado no Facebook com sucesso!</p>
    </div>
  );
};

export default FacebookLogin;

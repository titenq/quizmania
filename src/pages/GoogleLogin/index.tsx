import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './GoogleLogin.module.css';
import { AuthContext } from '../../context/AuthContext';
import TokenName from '../../enums/TokenName';
import Host from '../../enums/Host';
import getUser from '../../api/getUser';

const GoogleLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const getUserGoogle = async (token: string) => {
      const user = await getUser(token, Host.GOOGLE, TokenName.GOOGLE);
      
      if (!user) {
        navigate(`/login?error=${Host.GOOGLE}`);
      }

      localStorage.setItem(TokenName.GOOGLE, token);

      login(user);
      navigate('/admin');
    };

    token && getUserGoogle(token);
  }, [login, navigate, token]);

  return (
    <div className={styles.container}>
      <p>Logado no Google com sucesso!</p>
    </div>
  );
};

export default GoogleLogin;

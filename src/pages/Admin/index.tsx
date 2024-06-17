import styles from './Admin.module.css';
import { useAuth } from '../../hooks/useAuth';

const Admin = () => {
  const { userInfo } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Admin</h1>
      <p>{userInfo?.name}</p>
      <p>{userInfo?.email}</p>
      <p>{userInfo?.picture}</p>
    </div>
  );
};

export default Admin;

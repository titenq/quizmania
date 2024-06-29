import { useContext } from 'react';

import styles from './Admin.module.css';
import { AuthContext } from '../../context/AuthContext';

const Admin = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h1>Admin</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.picture}</p>
    </div>
  );
};

export default Admin;

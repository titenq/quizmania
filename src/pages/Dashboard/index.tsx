import styles from './Dashboard.module.css';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { userInfo } = useAuth();

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <p>{userInfo?.name}</p>
      <p>{userInfo?.email}</p>
      <p>{userInfo?.picture}</p>
    </div>
  );
};

export default Dashboard;

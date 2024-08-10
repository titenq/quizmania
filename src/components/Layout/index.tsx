import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import Header from '../Header';

const Layout = () => {
  return (
    <div className={styles.container_layout}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

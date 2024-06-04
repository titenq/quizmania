import Lottie from 'lottie-react';

import lottieNotFound from '../../assets/lotties/not-found.json';

import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Lottie animationData={lottieNotFound} className={styles.lottieNotFound} />
    </div>
  );
};

export default NotFound;

import Lottie from 'lottie-react';

import lottieNotFound from '../../assets/lotties/not-found.json';

import './notFound.css';

const NotFound = () => {
  return (
    <div className='container'>
      <Lottie animationData={lottieNotFound} className='lottieNotFound' />
    </div>
  );
};

export default NotFound;

import Lottie from 'lottie-react';

import lottieQuestion from '../../assets/lotties/question.json';
import lottieCheck from '../../assets/lotties/check.json';
import lottieError from '../../assets/lotties/error.json';
import lottieTwoQuestions from '../../assets/lotties/two-questions.json';

import styles from './Home.module.css';

const Home = () => {
  return (
    <div className='container'>
      <Lottie animationData={lottieQuestion} className={styles.lottieQuestion} />
      <Lottie animationData={lottieCheck} loop={false} className={styles.lottieCheck} />
      <Lottie animationData={lottieError} loop={false} className={styles.lottieError} />
      <Lottie animationData={lottieTwoQuestions} className={styles.lottieTwoQuestions} />
    </div>
  );
};

export default Home;

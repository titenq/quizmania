import Lottie from 'lottie-react';

import lottieQuestion from '../../assets/lotties/question.json';
import lottieCheck from '../../assets/lotties/check.json';
import lottieError from '../../assets/lotties/error.json';
import lottieTwoQuestions from '../../assets/lotties/two-questions.json';

import './home.css';

const Home = () => {
  return (
    <div className='container'>
      <Lottie animationData={lottieQuestion} className='lottieQuestion' />
      <Lottie animationData={lottieCheck} loop={false} className='lottieCheck' />
      <Lottie animationData={lottieError} loop={false} className='lottieError' />
      <Lottie animationData={lottieTwoQuestions} className='lottieTwoQuestions' />
    </div>
  );
};

export default Home;

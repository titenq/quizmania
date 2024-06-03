import Lottie from 'lottie-react';

import lottieQuiz from './assets/lotties/quiz.json';
import lottieQuestion from './assets/lotties/question.json';
import lottieCheck from './assets/lotties/check.json';
import lottieError from './assets/lotties/error.json';
import lottieTwoQuestions from './assets/lotties/two-questions.json';

import './App.css';

const App = () => {
  return (
    <>
      <Lottie animationData={lottieQuiz} loop={false} className='lottieQuiz' />

      <div className='container'>
        <Lottie animationData={lottieQuestion} className='lottieQuestion' />
        <Lottie animationData={lottieCheck} loop={false} className='lottieCheck' />
        <Lottie animationData={lottieError} loop={false} className='lottieError' />
        <Lottie animationData={lottieTwoQuestions} className='lottieTwoQuestions' />
      </div>
    </>
  );
};

export default App;

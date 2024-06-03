import Lottie from 'lottie-react';
import lottie1 from './assets/lotties/Animation - 1717429769932.json';
import lottie2 from './assets/lotties/Animation - 1717430096707.json';
import lottie3 from './assets/lotties/Animation - 1717430278810.json';

import './App.css';

const App = () => {
  return (
    <>
      <h1>Lottie</h1>
      <Lottie animationData={lottie1} className='lottie1' />
      <Lottie animationData={lottie2} loop={false} className='lottie2' />
      <Lottie animationData={lottie3} loop={false} className='lottie3' />
    </>
  );
};

export default App;

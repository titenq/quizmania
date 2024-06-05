import Lottie from 'lottie-react';

import lottieQuestion from '../../assets/lotties/question.json';
import lottieTwoQuestions from '../../assets/lotties/two-questions.json';

import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <Lottie animationData={lottieQuestion} className={styles.lottieQuestion} />
        <div className={styles.titleContainer} style={{ marginLeft: '-70px', marginTop: '-50px' }}>
          <div style={{ fontSize: '32px' }}>
            Crie o seu <span style={{ fontSize: '48px' }}>Quiz</span>
          </div>
          <div style={{ fontSize: '24px' }}>
            em minutos e
          </div>
          <div style={{ fontSize: '24px' }}>
            compartilhe o <span style={{ fontSize: '28px' }}>link</span>
          </div>
        </div>
      </div>

      <div className={styles.subcontainer} style={{ marginTop: '-80px' }}>
        <div className={styles.titleContainer}>
          <div style={{ fontSize: '32px' }}>
            É só incluir a <span style={{ fontSize: '48px' }}>Pergunta</span>
          </div>
          <div style={{ fontSize: '24px' }}>
            a resposta <span style={{ fontSize: '28px' }}>correta</span>
          </div>
          <div style={{ fontSize: '24px' }}>
            e as respostas <span style={{ fontSize: '28px' }}>erradas</span>
          </div>
        </div>
        <Lottie animationData={lottieTwoQuestions} className={styles.lottieTwoQuestions} />
      </div>
    </div>
  );
};

export default Home;

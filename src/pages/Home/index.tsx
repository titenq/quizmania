import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaQuestion } from 'react-icons/fa';
import Lottie from 'lottie-react';

import lottieQuestion from '../../assets/lotties/question.json';
import lottieTwoQuestions from '../../assets/lotties/two-questions.json';

import styles from './Home.module.css';
import getLatestQuizzes from '../../api/quiz/getLatestQuizzes';
import { IQuizLatest } from '../../interfaces/IQuiz';
import getTopQuizzes from '../../api/quiz/getTopQuizzes';
import TableQuizzes from '../../components/TableQuizzes';
import Button from '../../components/Button';

const Home = () => {
  const navigate = useNavigate();
  const [topQuizzes, setTopQuizzes] = useState<IQuizLatest[] | null>(null);
  const [latestQuizzes, setLatestQuizzes] = useState<IQuizLatest[] | null>(null);

  useEffect(() => {
    const fetchTopQuizzes = async () => {
      const response: IQuizLatest[] = await getTopQuizzes();
      
      response && setTopQuizzes(response);
    };

    const fetchLatestQuizzes = async () => {
      const response: IQuizLatest[] = await getLatestQuizzes();

      response && setLatestQuizzes(response);
    };

    fetchTopQuizzes();
    fetchLatestQuizzes();
  }, []);

  const handleGetAllQuizzes = () => {
    navigate('/quizzes');
  };

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
            É só incluir a <span style={{ fontSize: '48px' }}>Pergunta,</span>
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

      {topQuizzes && topQuizzes?.length > 0 && (
        <TableQuizzes
          title='Top Quizzes'
          quizzes={topQuizzes || []}
        />
      )}

      {latestQuizzes && latestQuizzes?.length > 0 && (
        <TableQuizzes
          title='Últimos Quizzes'
          quizzes={latestQuizzes || []}
        />
      )}
      
      <Button
        type="button"
        title="Todos os Quizzes"
        onClick={handleGetAllQuizzes}
        icon={<FaQuestion size={22} />}
      />
    </div>
  );
};

export default Home;

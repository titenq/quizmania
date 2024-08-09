import { useEffect, useState } from 'react';

import Lottie from 'lottie-react';
import { FaCheckCircle, FaLink, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';

import lottieQuestion from '../../assets/lotties/question.json';
import lottieTwoQuestions from '../../assets/lotties/two-questions.json';

import styles from './Home.module.css';
import formatDate from '../../helpers/formatDate';
import getLatestQuizzes from '../../api/quiz/getLatestQuizzes';
import { IQuizLatest } from '../../interfaces/IQuiz';

const Home = () => {
  const [latestQuizzes, setLatestQuizzes] = useState<IQuizLatest[] | null>(null);

  useEffect(() => {
    const fetchLatestesQuizzes = async () => {
      const response: IQuizLatest[] = await getLatestQuizzes();

      response && setLatestQuizzes(response);
    };

    fetchLatestesQuizzes();
  }, []);

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

      {latestQuizzes?.length !== 0 && (
        <table className={styles.neumorphism_table}>
          <thead>
            <tr>
              <th>Últimos Quizzes - Título</th>
              <th style={{ width: '20%' }}>Data</th>
              <th style={{ width: '15%' }}>Respostas</th>
              <th style={{ width: '5%' }}>Link</th>
            </tr>
          </thead>

          <tbody>
            {latestQuizzes && latestQuizzes.map(quiz => (
              <tr key={quiz._id}>
                <td>{quiz.quizTitle}</td>
                <td style={{ textAlign: 'center' }}>{formatDate(quiz.createdAt)}</td>
                <td style={{ textAlign: 'center' }}>
                  <div className={styles.percentage}>
                    <span className={styles.icon_container}>
                      {quiz.percentages.answersLength}
                      <FaQuestionCircle size={22} />
                    </span>
                    <span className={styles.icon_container}>
                      {quiz.percentages.percentRight}%
                      <FaCheckCircle size={22} style={{ color: '#00c853' }} />
                    </span>
                    <span className={styles.icon_container}>
                      {quiz.percentages.percentWrong}%
                      <FaTimesCircle size={22} style={{ color: '#f44336' }} />
                    </span>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <a href={`/quiz/${quiz._id}`} target='_blank' rel='noopener noreferrer'>
                    <FaLink size={18} className={styles.link_icon} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

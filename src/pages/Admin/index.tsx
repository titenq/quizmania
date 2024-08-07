import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCheckCircle, FaPlusCircle, FaLink, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

import styles from './Admin.module.css';
import { AuthContext } from '../../context/AuthContext';
import getAllQuizByUserId from '../../api/quiz/getAllQuizByUserId';
import { IQuizzes } from '../../interfaces/IQuiz';
import formatDate from '../../helpers/formatDate';
import Button from '../../components/Button';
import { IAnswersCreateResponse, IAnswersGet, IAnswersPercentage } from '../../interfaces/IAnswer';
import getAnswers from '../../api/answer/getAnswers';

const getQuizPercentages = (responseQuizzes: IAnswersCreateResponse[][]) => {
  const calculatePercentage = (total: number, correct: number) => (total === 0 ? 0 : (correct / total) * 100);

  return responseQuizzes.map((quizGroup) => {
    const totalAnswers = quizGroup.reduce((sum, quiz) => sum + quiz.totalAnswers, 0);
    const rightAnswers = quizGroup.reduce((sum, quiz) => sum + quiz.rightAnswers, 0);
    const wrongAnswers = quizGroup.reduce((sum, quiz) => sum + quiz.wrongAnswers, 0);

    const percentRight = calculatePercentage(totalAnswers, rightAnswers);
    const percentWrong = calculatePercentage(totalAnswers, wrongAnswers);

    return {
      percentRight: parseFloat(percentRight.toFixed(2)),
      percentWrong: parseFloat(percentWrong.toFixed(2))
    };
  });
};

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState<IQuizzes | null>(null);
  const [quizzesId, setQuizzesId] = useState<string[]>([]);
  const [responseQuizzes, setResponseQuizzes] = useState<IAnswersGet[][]>([]);
  const [answersPercentage, setAnswersPercentage] = useState<IAnswersPercentage[]>([]);

  const creatingQuiz = () => {
    navigate('/quiz');
  };

  useEffect(() => {
    const getAllQuiz = async (userId: string, page: number) => {
      const response: IQuizzes = await getAllQuizByUserId(userId, page);

      response && setQuizzes(response);
      response && setQuizzesId(response.quizzes.map(quiz => quiz?._id));
    };

    user && getAllQuiz(user._id, 1);
  }, [user]);

  useEffect(() => {
    const getAnswersByQuizId = async (quizId: string) => {
      const response: IAnswersCreateResponse[] = await getAnswers(quizId);

      return response;
    };

    const responseQuizzes: IAnswersCreateResponse[][] = [];

    const responseGetAllAnswers = async () => {
      for await (const quizId of quizzesId) {
        const response = await getAnswersByQuizId(quizId);

        responseQuizzes.push(response);
      }

      setAnswersPercentage(getQuizPercentages(responseQuizzes));
      setResponseQuizzes(responseQuizzes);
    };

    responseGetAllAnswers();
  }, [quizzesId]);

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>{user?.name} Admin</h1>

        <Button
          type='button'
          title='Criar Quiz'
          onClick={creatingQuiz}
          icon={<FaPlusCircle size={22} />}
        />
      </div>

      {quizzes?.quizzes?.length === 0 && (
        <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
          Você ainda não criou nenhum Quiz, clique em CRIAR QUIZ, é fácil e rápido!
        </p>
      )}

      {quizzes?.quizzes?.length !== 0 && (
        <table className={styles.neumorphism_table}>
          <thead>
            <tr>
              <th>Título</th>
              <th style={{ width: '20%' }}>Data</th>
              <th style={{ width: '15%' }}>Respostas</th>
              <th style={{ width: '5%' }}>Link</th>
            </tr>
          </thead>

          <tbody>
            {quizzes?.quizzes.map((quiz, index) => (
              <tr key={quiz._id}>
                <td>{quiz.quizTitle}</td>
                <td style={{ textAlign: 'center' }}>{formatDate(quiz.createdAt)}</td>
                <td style={{ textAlign: 'center' }}>
                  <div className={styles.percentage}>
                    <span>
                      {responseQuizzes[index] && responseQuizzes[index].length}
                      <FaQuestionCircle size={22} />
                    </span>
                    <span>
                      {answersPercentage[index] && answersPercentage[index].percentRight}%
                      <FaCheckCircle size={22} style={{ color: '#00ff00'}} />
                    </span>
                    <span>
                      {answersPercentage[index] && answersPercentage[index].percentWrong}%
                      <FaTimesCircle size={22} style={{ color: '#ff0000' }} />
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

export default Admin;

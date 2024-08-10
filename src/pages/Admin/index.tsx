import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCheckCircle, FaPlusCircle, FaLink, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

import styles from './Admin.module.css';
import AuthContext from '../../context/AuthContext';
import getAllQuizByUserId from '../../api/quiz/getAllQuizByUserId';
import { IQuizResponse, IQuizzes } from '../../interfaces/IQuiz';
import formatDate from '../../helpers/formatDate';
import Button from '../../components/Button';
import { IAnswersPercentage } from '../../interfaces/IAnswer';
import getAnswersPercentage from '../../api/answer/getAnswersPercentage';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState<IQuizResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [answersPercentage, setAnswersPercentage] = useState<IAnswersPercentage[]>([]);

  const creatingQuiz = () => {
    navigate('/quiz');
  };

  useEffect(() => {
    const getAllQuiz = async (userId: string, page: number) => {
      const response: IQuizzes = await getAllQuizByUserId(userId, page);

      console.log(response)

      setQuizzes(response.quizzes);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
    };

    user && getAllQuiz(user._id, currentPage);
  }, [currentPage, user]);

  useEffect(() => {
    const fetchAnswersPercentage = async (userId: string, page: number) => {
      const response: IAnswersPercentage[] = await getAnswersPercentage(userId, page);

      response && setAnswersPercentage(response);
    };

    user && fetchAnswersPercentage(user._id, 1);
  }, [user]);

  const handleAnswers = (quizId: string, quizTitle: string) => {
    navigate(`/quiz/${quizId}/answers`,
      { state: { quizTitle } }
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

      {quizzes?.length === 0 && (
        <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
          Você ainda não criou nenhum Quiz, clique em CRIAR QUIZ, é fácil e rápido!
        </p>
      )}

      {quizzes?.length !== 0 && (
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
            {quizzes.map((quiz, index) => (
              <tr key={quiz._id}>
                <td>{quiz.quizTitle}</td>
                <td style={{ textAlign: 'center' }}>{formatDate(quiz.createdAt)}</td>
                <td style={{ textAlign: 'center' }}>
                  <div className={styles.percentage}>
                    <span
                      className={styles.icon_container}
                      onClick={() => handleAnswers(quiz._id, quiz.quizTitle)}
                      style={{ cursor: 'pointer' }}
                    >
                      {answersPercentage[index] && answersPercentage[index].answersLength}
                      <FaQuestionCircle size={22} />
                    </span>
                    <span className={styles.icon_container}>
                      {answersPercentage[index] && answersPercentage[index].percentRight}%
                      <FaCheckCircle size={22} style={{ color: '#00c853'}} />
                    </span>
                    <span className={styles.icon_container}>
                      {answersPercentage[index] && answersPercentage[index].percentWrong}%
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

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Admin;

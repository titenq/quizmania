import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaPlusCircle, FaLink } from 'react-icons/fa';

import styles from './Admin.module.css';
import { AuthContext } from '../../context/AuthContext';
import getAllQuizByUserId from '../../api/quiz/getAllQuizByUserId';
import { IQuizzes } from '../../interfaces/IQuiz';
import formatDate from '../../helpers/formatDate';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState<IQuizzes | null>(null);

  const creatingQuiz = () => {
    navigate('/quiz');
  };

  useEffect(() => {
    const getAllQuiz = async (userId: string, page: number) => {
      const response: IQuizzes = await getAllQuizByUserId(userId, page);
      console.log(response)
      response && setQuizzes(response);
    };

    user && getAllQuiz(user._id, 1);
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>{user?.name} Admin</h1>

        <button className={`${styles.button_create} ${styles.neumorphism}`} onClick={creatingQuiz}>
          <span>Criar Quiz</span>
          <div className={styles.icon_button}>
            <span className={styles.icon}><FaPlusCircle size={22} /></span>
          </div>
        </button>
      </div>

      {quizzes?.quizzes.length === 0 && (
        <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
          Você ainda não criou nenhum Quiz, clique em CRIAR QUIZ, é fácil e rápido!
        </p>
      )}

      {quizzes?.quizzes.length !== 0 && (
        <table className={styles.neumorphism_table}>
          <thead>
            <tr>
              <th>Título</th>
              <th style={{ width: '25%' }}>Data</th>
              <th style={{ width: '10%' }}>Respostas</th>
              <th style={{ width: '5%' }}>Link</th>
            </tr>
          </thead>

          <tbody>
            {quizzes?.quizzes.map(quiz => (
              <tr key={quiz._id}>
                <td>{quiz.quizTitle}</td>
                <td style={{ textAlign: 'center' }}>{formatDate(quiz.createdAt)}</td>
                <td style={{ textAlign: 'center' }}>0</td>
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

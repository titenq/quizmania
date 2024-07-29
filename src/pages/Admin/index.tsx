import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaPlusCircle } from 'react-icons/fa';

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

      {!quizzes && (
        <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
          Você ainda não criou nenhum Quiz, clique em CRIAR QUIZ, é fácil e rápido!
        </p>
      )}

      {quizzes && (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Data</th>
              <th>Respostas</th>
            </tr>
          </thead>

          <tbody>
            {quizzes.quizzes.map(quiz => (
              <tr key={quiz._id}>
                <td>{quiz.quizTitle}</td>
                <td>{formatDate(quiz.createdAt)}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>{JSON.stringify(quizzes, null, 2)}</div>
    </div>
  );
};

export default Admin;

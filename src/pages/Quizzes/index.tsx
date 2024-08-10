import { useEffect, useState } from 'react';

import styles from './Quizzes.module.css';
import { IQuizLatest } from '../../interfaces/IQuiz';
import TableQuizzes from '../../components/TableQuizzes';
import getLatestQuizzes from '../../api/quiz/getLatestQuizzes';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<IQuizLatest[] | null>(null);

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      const response: IQuizLatest[] = await getLatestQuizzes(1000);

      response && setQuizzes(response);
    };

    fetchAllQuizzes();
  }, []);

  return (
    <div className={styles.container}>
      <TableQuizzes
        title='Todos os Quizzes'
        quizzes={quizzes || []}
      />
    </div>
  );
};

export default Quizzes;

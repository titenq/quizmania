import { useParams } from 'react-router-dom';

import styles from './QuizAnswers.module.css';

const QuizAnswers = () => {
  const { quizId } = useParams();
  
  return (
    <div className={styles.container}>
      {quizId}
    </div>
  );
};

export default QuizAnswers;

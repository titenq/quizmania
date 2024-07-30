import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './QuizQuestion.module.css';
import { IQuizResponse } from '../../interfaces/IQuiz';
import getQuizById from '../../api/quiz/getQuizById';
import shuffleAnswers from '../../helpers/shuffleAnswers';

const QuizQuestion = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<IQuizResponse | null>(null);

  useEffect(() => {
    const getQuiz = async (quizId: string) => {
      const response = await getQuizById(quizId);

      setQuiz(response);
    };

    quizId && getQuiz(quizId);
  }, [quizId]);

  return (
    <div className={styles.container}>
      {quiz && (
        <div>
          <h2>{quiz.quizTitle}</h2>

          {quiz.questions.map(item => {
            const allAnswers = shuffleAnswers([item.rightAnswer, ...item.wrongAnswers]);

            return (
              <div key={item.question}>
                <p>{item.question}</p>
                {allAnswers.map((answer: string, index: number) => (
                  <p key={index}>{answer}</p>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './QuizQuestion.module.css';
import { IQuizResponse } from '../../interfaces/IQuiz';
import getQuizById from '../../api/quiz/getQuizById';
import shuffleAnswers from '../../helpers/shuffleAnswers';
import questionMark from '../../assets/img/question-mark.png';
import a from '../../assets/img/a.png';
import b from '../../assets/img/b.png';
import c from '../../assets/img/c.png';
import d from '../../assets/img/d.png';
import e from '../../assets/img/e.png';

const answerImages = [a, b, c, d, e];

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
          <h2 style={{ textAlign: 'center' }}>{quiz.quizTitle}</h2>

          {quiz.questions.map(item => {
            const allAnswers = shuffleAnswers([item.rightAnswer, ...item.wrongAnswers]);

            return (
              <div key={item.question} className={styles.quiz_container}>
                <div className={styles.answer_container}>
                  <img src={questionMark} alt='interrogação' />
                  <p className={styles.neumorphism}>{item.question}</p>
                </div>
                {allAnswers.map((answer: string, index: number) => (
                  <div key={`${answer}-${index}`} className={styles.answer_container}>
                    <img src={answerImages[index]} alt={`alternativa-${index + 1}`} />
                    <p className={styles.neumorphism}>{answer}</p>
                  </div>
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

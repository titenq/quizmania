import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './QuizAnswersResponse.module.css';
import { IAnswer } from '../../interfaces/IAnswer';
import getQuizById from '../../api/quiz/getQuizById';
import { IQuizModifiedResponse } from '../../interfaces/IQuiz';
import questionMark from '../../assets/img/question-mark.png';
import a from '../../assets/img/a.png';
import b from '../../assets/img/b.png';
import c from '../../assets/img/c.png';
import d from '../../assets/img/d.png';
import e from '../../assets/img/e.png';

const answerImages = [a, b, c, d, e];

const QuizAnswersResponse = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const answers: IAnswer[] = location.state?.answers;
  const message: string = location.state?.message;
  const [questions, setQuestions] = useState<IQuizModifiedResponse>();

  useEffect(() => {
    const fetchQuiz = async (quizId: string) => {
      const response = await getQuizById(quizId);

      setQuestions(response);
    };

    quizId && fetchQuiz(quizId);
  }, [quizId]);

  return (
    <div className={styles.container}>
      {questions && (
        <div className={styles.quiz_form}>
          <h2 className={styles.quiz_title}>
            {questions && questions.quizTitle}
          </h2>

          {message && (
            <div className={styles.result_message}>
              {message}
            </div>
          )}

          <div className={styles.quiz_container}>
            {answers && answers.map((item, index) => (
              <div key={item.question}>
                <div className={styles.answer_container}>
                  <img src={questionMark} alt='interrogação' />
                  <p className={`${styles.neumorphism} ${styles.question}`}>{item.question}</p>
                </div>

                <div className={styles.answer_wrapper}>
                  {questions.questions[index].answers.map((question, i) => (
                    <div
                      key={question}
                      className={`${styles.question_container} ${question === item.answer
                        ? (item.isRight ? styles.right_answer : styles.wrong_answer)
                        : ''}`}
                    >
                      <div className={styles.answer_image_container}>
                        <img src={answerImages[i]} alt={`alternativa-${i + 1}`} />
                        <p className={styles.neumorphism}>{question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAnswersResponse;

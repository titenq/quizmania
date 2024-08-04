import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './QuizQuestion.module.css';
import { IQuizModifiedResponse } from '../../interfaces/IQuiz';
import getQuizById from '../../api/quiz/getQuizById';
import questionMark from '../../assets/img/question-mark.png';
import a from '../../assets/img/a.png';
import b from '../../assets/img/b.png';
import c from '../../assets/img/c.png';
import d from '../../assets/img/d.png';
import e from '../../assets/img/e.png';
import Button from '../../components/Button';
import { FaArrowCircleRight, FaCloudUploadAlt } from 'react-icons/fa';
import { IGenericError } from '../../interfaces/IGenericError';
import ModalError from '../../components/ModalError';

const answerImages = [a, b, c, d, e];

const QuizQuestion = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<IQuizModifiedResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const getQuiz = async (quizId: string) => {
      const response: IQuizModifiedResponse | IGenericError = await getQuizById(quizId);

      if ('error' in response) {
        setQuiz(null);
        setErrorMessage(response.message);
        return;
      }

      setQuiz(response);
    };

    quizId && getQuiz(quizId);
  }, [quizId]);

  useEffect(() => {
    if (quiz && quiz.questions[currentQuestionIndex]) {
      const currentQuestion = quiz.questions[currentQuestionIndex];
      setCurrentAnswers(currentQuestion.answers);
    }

    setAnswered(false);
  }, [quiz, currentQuestionIndex]);

  const handleAnswerSelection = (answer: string) => {
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });

    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    setAnswered(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userAnswers);
  };

  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const totalQuestions = quiz?.questions.length || 0;

  return (
    <div className={styles.container}>
      {quiz && (
        <form onSubmit={handleSubmit} className={styles.quiz_form}>
          <h2 className={styles.quiz_title}>
            {quiz.quizTitle} <span className={styles.total_questions}>(Pergunta {currentQuestionIndex + 1} de {totalQuestions})</span>
          </h2>
          <div className={styles.quiz_container}>
            {currentQuestion && (
              <>
                <div className={styles.answer_container}>
                  <img src={questionMark} alt='interrogação' />
                  <p className={`${styles.neumorphism} ${styles.question}`}>{currentQuestion.question}</p>
                </div>

                {currentAnswers.map((answer: string, index: number) => (
                  <div key={`${answer}-${index}`} className={styles.answer_wrapper}>
                    <input
                      type="radio"
                      name="answer"
                      value={answer}
                      checked={userAnswers[currentQuestionIndex] === answer}
                      onChange={() => handleAnswerSelection(answer)}
                      className={styles.radio_input}
                      id={`answer-${index}`}
                    />
                    <label
                      htmlFor={`answer-${index}`}
                      className={`${styles.question_container} ${userAnswers[currentQuestionIndex] === answer ? styles.selected : ''}`}
                    >
                      <div className={styles.answer_image_container}>
                        <img src={answerImages[index]} alt={`alternativa-${index + 1}`} />
                        <p className={styles.neumorphism}>{answer}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className={styles.button_container}>
            {answered && currentQuestionIndex < (quiz?.questions.length || 0) - 1 && (
              <Button
                type="button"
                title="Próximo"
                onClick={handleNextQuestion}
                icon={<FaArrowCircleRight size={22} />}
              />
            )}

            {answered && currentQuestionIndex === (quiz?.questions.length || 0) - 1 && (
              <Button
                type="submit"
                title="Enviar"
                icon={<FaCloudUploadAlt size={22} />}
              />
            )}
          </div>
        </form>
      )}

      <ModalError errorMessage={errorMessage} shouldNavigate={true} setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default QuizQuestion;

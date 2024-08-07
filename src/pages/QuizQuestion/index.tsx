import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './QuizQuestion.module.css';
import { IQuizAnswers, IQuizModifiedResponse } from '../../interfaces/IQuiz';
import getQuizById from '../../api/quiz/getQuizById';
import questionMark from '../../assets/img/question-mark.png';
import a from '../../assets/img/a.png';
import b from '../../assets/img/b.png';
import c from '../../assets/img/c.png';
import d from '../../assets/img/d.png';
import e from '../../assets/img/e.png';
import acertou from '../../assets/img/acertou.png';
import errou from '../../assets/img/errou.png';
import Button from '../../components/Button';
import { FaArrowCircleRight, FaCloudUploadAlt, FaQuestion } from 'react-icons/fa';
import { IGenericError } from '../../interfaces/IGenericError';
import ModalError from '../../components/ModalError';
import checkAnswer from '../../api/quiz/checkAnswer';
import { IAnswers, IAnswersCreateResponse } from '../../interfaces/IAnswer';
import createAnswer from '../../api/answer/createAnswer';

const answerImages = [a, b, c, d, e];

const QuizQuestion = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<IQuizModifiedResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<IQuizAnswers[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [rightAnswer, setRightAnswer] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);


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
    setIsCorrect(null);
    setRightAnswer(null);
  }, [quiz, currentQuestionIndex]);

  const handleAnswerSelection = (answer: string) => {
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      const currentQuestionText = quiz?.questions[currentQuestionIndex].question || '';

      newAnswers[currentQuestionIndex] = {
        question: currentQuestionText,
        answer,
        isRight: false
      };

      return newAnswers;
    });

    setAnswered(true);
  };

  const handleCheckAnswer = async () => {
    if (quizId) {
      const answerResponse = {
        quizId,
        question: currentQuestion!.question,
        answer: userAnswers[currentQuestionIndex].answer
      };

      const response = await checkAnswer(answerResponse);

      setIsCorrect(response.isRight);
      setRightAnswer(response.rightAnswer);

      setUserAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex].isRight = response.isRight;

        return newAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    setAnswered(false);
    setIsCorrect(null);
    setRightAnswer(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const answers: IAnswers = {
      quizId: quizId!,
      answers: userAnswers
    };

    const postCreateAnswer: IAnswersCreateResponse = await createAnswer(answers);

    if (postCreateAnswer) {
      const totalAnswers = postCreateAnswer.totalAnswers;
      const rightAnswers = postCreateAnswer.rightAnswers;
      const percentage = (rightAnswers / totalAnswers) * 100;

      const percentageMessages = [
        { threshold: 100, message: " - Sensacional!" },
        { threshold: 50, message: " - Parabéns!" },
        { threshold: 0, message: " - Pode melhorar!" }
      ];

      const getMessage = (percentage: number) =>
        percentageMessages.find(({ threshold }) =>
          percentage >= threshold)?.message || '';

      const message = `Você acertou ${rightAnswers} de ${totalAnswers} pergunta${totalAnswers > 1 ? 's' : ''}${getMessage(percentage)}`;

      setResultMessage(message);
    }
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
                <div className={styles.answer_container} key={currentQuestionIndex}>
                  <img src={questionMark} alt='interrogação' />
                  <p className={`${styles.neumorphism} ${styles.question}`}>{currentQuestion.question}</p>
                </div>

                {currentAnswers.map((answer: string, index: number) => {
                  const isSelected = userAnswers[currentQuestionIndex]?.answer === answer;
                  const isRightAnswer = rightAnswer === answer;

                  return (
                    <div key={`${answer}-${index}`} className={styles.answer_wrapper}>
                      <input
                        type="radio"
                        name="answer"
                        value={answer}
                        checked={isSelected}
                        onChange={() => handleAnswerSelection(answer)}
                        className={styles.radio_input}
                        id={`answer-${index}`}
                        disabled={isCorrect !== null} 
                      />
                      <label
                        htmlFor={`answer-${index}`}
                        className={`${styles.question_container} ${isSelected ? styles.selected : ''} ${isRightAnswer ? styles.correct_answer : ''}`}
                      >
                        <div className={styles.answer_image_container}>
                          <img src={answerImages[index]} alt={`alternativa-${index + 1}`} />
                          <p className={styles.neumorphism}>{answer}</p>
                        </div>
                      </label>
                    </div>
                  );
                })}

                {answered && isCorrect !== null && (
                  <div className={styles.result_image_container}>
                    <img src={isCorrect ? acertou : errou} alt={isCorrect ? 'Acertou' : 'Errou'} />
                  </div>
                )}
              </>
            )}
          </div>

          <div className={styles.button_container}>
            {answered && isCorrect === null && (
              <Button
                type="button"
                title="Responder"
                onClick={handleCheckAnswer}
                icon={<FaQuestion size={22} />}
              />
            )}

            {isCorrect !== null && currentQuestionIndex < (quiz?.questions.length || 0) - 1 && (
              <Button
                type="button"
                title="Próximo"
                onClick={handleNextQuestion}
                icon={<FaArrowCircleRight size={22} />}
              />
            )}

            {isCorrect !== null && currentQuestionIndex === (quiz?.questions.length || 0) - 1 && (
              <Button
                type="submit"
                title="Enviar"
                icon={<FaCloudUploadAlt size={22} />}
              />
            )}
          </div>
        </form>
      )}

      {resultMessage && (
        <div className={styles.result_message}>
          {resultMessage}
        </div>
      )}

      <ModalError errorMessage={errorMessage} shouldNavigate={true} setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default QuizQuestion;

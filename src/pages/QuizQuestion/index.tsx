import { useEffect, useState } from 'react';
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

const answerImages = [a, b, c, d, e];

const QuizQuestion = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<IQuizModifiedResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);

  useEffect(() => {
    const getQuiz = async (quizId: string) => {
      const response: IQuizModifiedResponse = await getQuizById(quizId);

      setQuiz(response);
    };

    quizId && getQuiz(quizId);
  }, [quizId]);

  useEffect(() => {
    if (quiz && quiz.questions[currentQuestionIndex]) {
      const currentQuestion = quiz.questions[currentQuestionIndex];

      setCurrentAnswers(currentQuestion.answers);
    }
  }, [quiz, currentQuestionIndex]);

  const handleAnswerSelection = (answer: string) => {
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Quiz finished!', userAnswers);
      // Aqui você pode adicionar lógica para enviar as respostas do usuário ao servidor ou processar o resultado.
    }
  };

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      {quiz && (
        <div>
          <h2 className={styles.quiz_title}>{quiz.quizTitle}</h2>
          <div className={styles.quiz_container}>
            {currentQuestion && (
              <>
                <div className={styles.answer_container}>
                  <img src={questionMark} alt='interrogação' />
                  <p className={styles.neumorphism}>{currentQuestion.question}</p>
                </div>
                {currentAnswers.map((answer: string, index: number) => (
                  <div
                    key={`${answer}-${index}`}
                    className={`${styles.answer_container}
                      ${styles.question_container} 
                      ${userAnswers[currentQuestionIndex] === answer ? styles.selected : ''}`
                    }
                    onClick={() => handleAnswerSelection(answer)}
                  >
                    <img src={answerImages[index]} alt={`alternativa-${index + 1}`} />
                    <p className={styles.neumorphism}>{answer}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex < (quiz?.questions.length || 0) - 1 ? 'Próximo' : 'Enviar'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;

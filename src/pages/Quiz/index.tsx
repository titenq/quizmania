import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaPlusCircle } from 'react-icons/fa';

import styles from './Quiz.module.css';
import AuthContext from '../../context/AuthContext';
import { IQuiz, IQuestion } from '../../interfaces/IQuiz';
import createQuiz from '../../api/quiz/createQuiz';
import ModalError from '../../components/ModalError';
import Button from '../../components/Button';
import { IGenericError } from '../../interfaces/IGenericError';

const Quiz = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [quizTitle, setQuizTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([
    { question: '', rightAnswer: '', wrongAnswers: ['', '', '', ''] }
  ]);

  const handleQuizTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizTitle(event.target.value);
  };

  const handleChange = (
    index: number,
    field: keyof IQuestion,
    value: string,
    answerIndex?: number
  ) => {
    setQuestions(prevQuestions =>
      prevQuestions.map((question, questionIndex) => {
        if (questionIndex !== index) {
          return question;
        }

        if (field === 'wrongAnswers' && answerIndex !== undefined) {
          const updatedWrongAnswers = question.wrongAnswers.map((answer, idx) =>
            idx === answerIndex ? value : answer
          );

          return { ...question, wrongAnswers: updatedWrongAnswers };
        }

        return { ...question, [field]: value };
      })
    );
  };

  const addQuestion = () => {
    validateForm() && setQuestions([
      ...questions,
      { question: '', rightAnswer: '', wrongAnswers: ['', '', '', ''] }
    ]);
  };

  const validateForm = () => {
    if (!quizTitle) {
      setErrorMessage('O título do Quiz não pode estar em branco');

      return false;
    }

    const isValid = questions.every((currentQuestion, i) => {
      if (!currentQuestion.question) {
        setErrorMessage(`A pergunta ${i + 1} está em branco`);

        return false;
      }

      if (!currentQuestion.rightAnswer) {
        setErrorMessage(`A resposta correta da pergunta ${i + 1} está em branco`);

        return false;
      }

      const hasEmptyWrongAnswer = currentQuestion.wrongAnswers.some((wrongAnswer, index) => {
        if (!wrongAnswer) {
          setErrorMessage(`A resposta errada ${index + 1} da pergunta ${i + 1} está em branco`);

          return true;
        }

        return false;
      });

      if (hasEmptyWrongAnswer) {
        return false;
      }

      if (currentQuestion.wrongAnswers.includes(currentQuestion.rightAnswer)) {
        setErrorMessage(`A resposta correta e uma das respostas erradas na pergunta ${i + 1} são iguais`);

        return false;
      }

      const wrongAnswersSet = new Set(currentQuestion.wrongAnswers);

      if (wrongAnswersSet.size !== currentQuestion.wrongAnswers.length) {
        setErrorMessage(`Existem respostas erradas duplicadas na pergunta ${i + 1}`);

        return false;
      }

      return true;
    });

    if (!isValid) {
      return false;
    }

    setErrorMessage(null);
    
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateForm();

    if (!validateForm()) {
      return;
    }

    let quiz: IQuiz | undefined;

    if (user && user._id) {
      quiz = {
        userId: user._id,
        quizTitle,
        questions
      };
    }

    const response: IQuiz | IGenericError = await createQuiz(quiz!);

    if ('error' in response) {
      setErrorMessage(response.message);

      return;
    }

    navigate('/admin');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>{user?.name} - Criar Quiz</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.label} htmlFor="quizTitle">*Título do Quiz</label>
        <input
          type="text"
          name="quizTitle"
          id="quizTitle"
          className={`${styles.input} ${styles.neumorphism}`}
          value={quizTitle}
          onChange={handleQuizTitle}
          spellCheck={false}
        />

        {questions.map((q, index) => (
          <div key={index} className={styles.form}>
            <label className={styles.label} htmlFor={`question${index}`}>*Pergunta {index + 1}</label>
            <input
              type="text"
              name={`question${index}`}
              id={`question${index}`}
              className={`${styles.input} ${styles.neumorphism}`}
              value={q.question}
              onChange={e => handleChange(index, 'question', e.target.value)}
              spellCheck={false}
            />

            <label className={styles.label} htmlFor={`rightAnswer${index}`}>*Resposta Correta</label>
            <input
              type="text"
              name={`rightAnswer${index}`}
              id={`rightAnswer${index}`}
              className={`${styles.input} ${styles.neumorphism}`}
              value={q.rightAnswer}
              onChange={e => handleChange(index, 'rightAnswer', e.target.value)}
              spellCheck={false}
            />

            {q.wrongAnswers.map((answer: string, ansIndex: number) => (
              <div key={ansIndex} className={`${styles.form} ${styles.wrong_answer}`}>
                <label className={styles.label} htmlFor={`wrongAnswer${index}${ansIndex}`}>*Resposta Errada</label>
                <input
                  type="text"
                  name={`wrongAnswer${index}${ansIndex}`}
                  id={`wrongAnswer${index}${ansIndex}`}
                  className={`${styles.input} ${styles.neumorphism}`}
                  value={answer}
                  onChange={e => handleChange(index, 'wrongAnswers', e.target.value, ansIndex)}
                  spellCheck={false}
                />
              </div>
            ))}
          </div>
        ))}

        <div className={styles.buttons_container}>
          <Button
            type='button'
            title='Adicionar Pergunta'
            onClick={addQuestion}
            icon={<FaPlusCircle size={22} />}
          />

          <Button
            type='submit'
            title='Enviar'
          />
        </div>
      </form>

      <ModalError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default Quiz;

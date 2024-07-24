import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import { FaPlusCircle } from 'react-icons/fa';

import styles from './Admin.module.css';
import { AuthContext } from '../../context/AuthContext';
import { IQuestion } from '../../interfaces/IQuestion';
import { IQuiz } from '../../interfaces/IQuiz';
import { IModalErrorProps } from '../../interfaces/IModalErrorProps';
import createQuiz from '../../api/quiz/createQuiz';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [isCreateQuiz, setIsCreateQuiz] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModalError, setShowModalError] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([
    { question: '', rightAnswer: '', wrongAnswers: ['', '', '', ''] }
  ]);

  useEffect(() => {
    if (errorMessage) {
      setShowModalError(true);
    }
  }, [errorMessage]);

  const handleModalClose = () => {
    setShowModalError(false);
  };

  const handleQuizTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizTitle(event.target.value);
  };

  const creatingQuiz = () => {
    setIsCreateQuiz(true);
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
    if (!validateForm()) {
      return;
    }

    setQuestions([
      ...questions,
      { question: '', rightAnswer: '', wrongAnswers: ['', '', '', ''] }
    ]);
  };

  const validateForm = () => {
    if (!quizTitle) {
      setErrorMessage('O título do Quiz não pode estar em branco');
      setShowModalError(true);
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const currentQuestion = questions[i];

      if (!currentQuestion.question) {
        setErrorMessage(`A pergunta ${i + 1} está em branco`);
        setShowModalError(true);
        return false;
      }

      if (!currentQuestion.rightAnswer) {
        setErrorMessage(`A resposta correta da pergunta ${i + 1} está em branco`);
        setShowModalError(true);
        return false;
      }

      if (currentQuestion.wrongAnswers.some((wrongAnswer, index) => {
        if (!wrongAnswer) {
          setErrorMessage(`A resposta errada ${index + 1} da pergunta ${i + 1} está em branco`);
          setShowModalError(true);
          return true;
        }
        return false;
      })) {
        return false;
      }
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    const quizCreated = await createQuiz(quiz!);

    console.log(quizCreated);
  };

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

      {!isCreateQuiz && (
        questions[0].question === '' ? (
          <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
            Você ainda não criou nenhum Quiz, clique em CRIAR QUIZ, é fácil e rápido!
          </p>
        ) : (
          <p className={`${styles.no_quizzes} ${styles.neumorphism}`}>
            Seus Quizzes
          </p>
        )
      )}

      {isCreateQuiz && (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label} htmlFor="quizTitle">*Título do Quiz</label>
          <input
            type="text"
            name="quizTitle"
            id="quizTitle"
            className={`${styles.input} ${styles.neumorphism}`}
            value={quizTitle}
            onChange={handleQuizTitle}
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
              />

              <label className={styles.label} htmlFor={`rightAnswer${index}`}>*Resposta Correta</label>
              <input
                type="text"
                name={`rightAnswer${index}`}
                id={`rightAnswer${index}`}
                className={`${styles.input} ${styles.neumorphism}`}
                value={q.rightAnswer}
                onChange={e => handleChange(index, 'rightAnswer', e.target.value)}
              />

              {q.wrongAnswers.map((answer, ansIndex) => (
                <div key={ansIndex} className={`${styles.form} ${styles.wrong_answer}`}>
                  <label className={styles.label} htmlFor={`wrongAnswer${index}${ansIndex}`}>*Resposta Errada</label>
                  <input
                    type="text"
                    name={`wrongAnswer${index}${ansIndex}`}
                    id={`wrongAnswer${index}${ansIndex}`}
                    className={`${styles.input} ${styles.neumorphism}`}
                    value={answer}
                    onChange={e => handleChange(index, 'wrongAnswers', e.target.value, ansIndex)}
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className={`${styles.button_create} ${styles.neumorphism}`}
          >
            <span>Adicionar Pergunta</span>
            <div className={styles.icon_button}>
              <span className={styles.icon}><FaPlusCircle size={22} /></span>
            </div>
          </button>

          <button
            type="submit"
            className={`${styles.button_create} ${styles.neumorphism} ${styles.submit}`}
          >
            Enviar
          </button>
        </form>
      )}

      {showModalError && <ModalError errorMessage={errorMessage} handleModalClose={handleModalClose} />}
    </div>
  );
};

const ModalError = (props: IModalErrorProps) => (
  <div className={styles.modal}>
    <div className={styles.modal_content}>
      <h2 className={styles.modal_text}>Erro</h2>
      <p className={styles.modal_text}>{props.errorMessage}</p>
      
      <button
        onClick={props.handleModalClose}
        className={`${styles.button_create} ${styles.neumorphism} ${styles.button_modal_close}`}
      >
        Fechar
      </button>
    </div>
  </div>
);

export default Admin;
